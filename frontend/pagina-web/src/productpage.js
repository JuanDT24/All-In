// ProductPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function ProductPage({
  userName,
  product,
  onLogoClick,
  onBack,
  onPurchase, // Función para manejar la compra
  onBid,      // Función para manejar la puja (oferta)
}) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [bidAmount, setBidAmount] = useState('');

  // Funciones para manejar la apertura y cierre de los modales
  const handleBuyClick = () => {
    setShowPurchaseModal(true);
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

  const handleBidClick = () => {
    setShowBidModal(true);
  };

  const handleBidModalClose = () => {
    setShowBidModal(false);
    setBidAmount('');
  };

  // Maneja los cambios en los inputs del modal de compra
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  // Maneja la compra
  const handlePurchase = () => {
    // Aquí puedes integrar la lógica para procesar la compra
    onPurchase(product);
    alert('Compra realizada exitosamente');
    setShowPurchaseModal(false);
    setCardInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
  };

  // Maneja los cambios en el input de la oferta
  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  // Maneja la oferta
  const handleBidSubmit = () => {
    const bidValue = parseFloat(bidAmount);
    const minBid = parseFloat(product.auctionPrice) + parseFloat(product.minBidIncrement);

    if (isNaN(bidValue)) {
      alert('Por favor, ingresa un valor válido para la oferta.');
      return;
    }

    if (bidValue < minBid) {
      alert(`La oferta mínima es de $${minBid}.`);
      return;
    }

    // Aquí puedes integrar la lógica para procesar la oferta
    onBid(product.id, bidValue);
    alert('Oferta realizada exitosamente');
    setShowBidModal(false);
    setBidAmount('');
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
      {/* Barra de navegación */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#001f3f' }}
      >
        <div className="container">
          <button
            className="navbar-brand btn btn-link p-0 m-0 d-flex align-items-center"
            onClick={onLogoClick}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
            All In
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <span className="navbar-text me-3">Bienvenido, {userName}</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={onBack}>
          &larr; Volver
        </button>

        <div className="card mb-4 shadow-sm">
          <div className="row g-0">
            {/* Imagen del producto */}
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded-start"
                style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
              />
            </div>
            {/* Detalles del producto */}
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title mb-3">{product.name}</h2>
                <p className="card-text">{product.description}</p>

                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>Precio:</strong> ${product.price}
                  </li>
                  <li className="list-group-item">
                    <strong>Precio de Subasta:</strong> ${product.auctionPrice}
                  </li>
                  <li className="list-group-item">
                    <strong>Precio de Compra Inmediata:</strong> ${product.instantBuyPrice}
                  </li>
                  <li className="list-group-item">
                    <strong>Mínimo para la Puja:</strong> ${product.minBidIncrement}
                  </li>
                  <li className="list-group-item">
                    <strong>Fecha de Inicio de la Subasta:</strong>{' '}
                    {new Date(product.auctionStartDate).toLocaleString()}
                  </li>
                  <li className="list-group-item">
                    <strong>Fecha de Terminación de la Subasta:</strong>{' '}
                    {new Date(product.auctionEndDate).toLocaleString()}
                  </li>
                </ul>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleBuyClick}
                    style={{ backgroundColor: '#001f3f', borderColor: '#001f3f' }}
                  >
                    Comprar
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={handleBidClick}
                    style={{
                      backgroundColor: '#FFC107',
                      borderColor: '#FFC107',
                      color: 'black',
                    }}
                  >
                    Hacer Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      {showPurchaseModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información de Pago</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handlePurchaseModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Campos de tarjeta */}
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
                      placeholder="1234 5678 9012 3456"
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
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/AA"
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
                      placeholder="123"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handlePurchaseModalClose}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handlePurchase}
                  style={{ backgroundColor: '#001f3f', borderColor: '#001f3f' }}
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Oferta */}
      {showBidModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Realizar Oferta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleBidModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Campo de oferta */}
                  <div className="mb-3">
                    <label htmlFor="bidAmount" className="form-label">
                      Monto de la Oferta
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="bidAmount"
                      name="bidAmount"
                      placeholder={`$${parseFloat(product.auctionPrice) } mínimo`}
                      value={bidAmount}
                      onChange={handleBidAmountChange}
                      min={parseFloat(product.auctionPrice) + parseFloat(product.minBidIncrement)}
                    />
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
                <button
                  className="btn btn-warning"
                  onClick={handleBidSubmit}
                  style={{
                    backgroundColor: '#FFC107',
                    borderColor: '#FFC107',
                    color: 'black',
                  }}
                >
                  Hacer Oferta
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
