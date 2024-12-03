import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function ProductPage({ userName, product, onLogoClick, onBack, onPurchase }) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });


  const [savedCards, setSavedCards] = useState([]);

  const handleBuyClick = () => setShowPurchaseModal(true);

  const handleBidClick = () => {
    setBidAmount(''); // Restablecer monto de oferta al abrir el modal
    setShowBidModal(true);
  };

  const handlePurchaseModalClose = () => {
    setShowPurchaseModal(false);
    setCardInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const handleBidModalClose = () => {
    setShowBidModal(false);
    setBidAmount('');
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleSaveCard = () => {
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
      alert('Por favor, completa toda la información de la tarjeta.');
      return;
    }

    setSavedCards([...savedCards, { ...cardInfo }]);
    alert('Tarjeta registrada exitosamente.');
    setCardInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const handlePurchase = () => {
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
      alert('Por favor, completa toda la información de la tarjeta.');
      return;
    }

    if (onPurchase) {
      onPurchase(product);
      alert(`Compra exitosa del producto: ${product.name} por ${formatCurrency(product.instantBuyPrice)}`);
    }

    setShowPurchaseModal(false);
  };

  const handleBidSubmit = async() => {
    const minimumBid = parseFloat(product.BidPrice) + parseFloat(product.minBidIncrement);
    const enteredBid = parseFloat(bidAmount);

    if (isNaN(enteredBid)) {
      alert('Por favor, ingresa un valor numérico válido.');
      return;
    }

    if (enteredBid < minimumBid) {
      alert(`Tu oferta debe ser al menos ${formatCurrency(minimumBid)}.`);
      return;
    }

    const response = await fetch(`http://localhost:5000/api/users/${userName}`);
    const dataUser = await response.json();

    let ImmPur = false
    if(enteredBid >= product.instantBuyPrice){
      ImmPur = true
    }

    const bidData = {
      IdItem: product.id,
      IdBidder: dataUser[0].iduser,
      Price: enteredBid,
      BidDate: new Date().toISOString(),
      ImmediatePurchase: ImmPur
    };

    try {
      const response = await fetch('http://localhost:5000/api/bids/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData)
      });
      const data = await response.json();
      if (!response.ok){
        alert('Error al Pujar')
      }
      alert('Puja Exitosa')
      
    } catch (error){
      alert('Error al conectar con el servidor')
    }

    alert(`Tu oferta de ${formatCurrency(enteredBid)} ha sido registrada para el producto: ${product.name}`);
    setShowBidModal(false);


  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        color: '#2c3e50',
      }}
    >
      {/* Barra de navegación */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <div className="container">
          <button
            className="navbar-brand btn btn-link p-0 m-0 d-flex align-items-center"
            onClick={onLogoClick}
            style={{
              textDecoration: 'none',
              color: '#2c3e50',
              fontWeight: 700,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '45px',
                height: '45px',
                marginRight: '15px',
                borderRadius: '50%',
              }}
            />
            All In
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <span className="navbar-text">Bienvenido, {userName}</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={onBack}>
          &larr; Volver
        </button>

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <div className="row g-0">
            {/* Imagen del producto */}
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  filter: 'brightness(0.9)',
                }}
              />
            </div>

            {/* Detalles del producto */}
            <div className="col-md-6 bg-white">
              <div className="p-5">
                <h2
                  className="mb-3"
                  style={{
                    fontWeight: 700,
                    color: '#2c3e50',
                  }}
                >
                  {product.name}
                </h2>
                <p className="text-muted mb-4" style={{ lineHeight: 1.6 }}>
                  {product.description}
                </p>

                <div
                  className="bg-light p-4 rounded mb-4"
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Precio de Subasta</small>
                      <h4 className="mb-0">{formatCurrency(product.BidPrice)}</h4>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Compra Inmediata</small>
                      <h4 className="mb-0">{formatCurrency(product.instantBuyPrice)}</h4>
                    </div>
                    <div className="col-6 mt-3">
                      <small className="text-muted">Fecha de Término</small>
                      <h5 className="mb-0">{new Date(product.auctionEndDate).toLocaleString()}</h5>
                    </div>
                    <div className="col-6 mt-3">
                      <small className="text-muted">Mínimo de Puja</small>
                      <h5 className="mb-0">{formatCurrency(product.minBidIncrement)}</h5>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleBuyClick}
                    style={{
                      backgroundColor: '#3498db',
                      borderColor: '#3498db',
                    }}
                  >
                    Comprar Ahora
                  </button>
                  <button
                    className="btn btn-outline-warning btn-lg"
                    onClick={handleBidClick}
                  >
                    Hacer Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de compra */}
      {showPurchaseModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Compra</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handlePurchaseModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardName" className="form-label">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardName"
                      name="cardName"
                      value={cardInfo.cardName}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Fecha de Expiración
                    </label>
                    <input
                      type="month"
                      className="form-control"
                      id="expiryDate"
                      name="expiryDate"
                      value={cardInfo.expiryDate}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </form>
                <button
                  className="btn btn-success"
                  onClick={handleSaveCard}
                  style={{ marginTop: '10px' }}
                >
                  Guardar Tarjeta
                </button>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handlePurchaseModalClose}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handlePurchase}>
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de oferta */}
      {showBidModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hacer Oferta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleBidModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="bidAmount" className="form-label">
                      Monto de la Oferta
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="bidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <small className="form-text text-muted">
                      El monto mínimo para pujar es{' '}
                      {formatCurrency(
                        parseFloat(product.BidPrice) +
                          parseFloat(product.minBidIncrement)
                      )}
                      .
                    </small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleBidModalClose}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleBidSubmit}>
                  Confirmar Oferta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
