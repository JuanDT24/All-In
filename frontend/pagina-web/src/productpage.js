// ProductPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import { MdArrowBack, MdPayment, MdAdd, MdCreditCard } from 'react-icons/md';

function ProductPage({ userEmail, userName, product, onLogoClick, onBack, onPurchase }) {
  const [showBidModal, setShowBidModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCardSelectionModal, setShowCardSelectionModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pay_methods/user/${userEmail}`);
        const data = await response.json();
        setSavedCards(data);
      } catch (error) {
        console.error('Error al cargar las tarjetas:', error);
      }
    };
    fetchCards();
  }, [userEmail]);

  const handleBidClick = () => {
    setBidAmount('');
    setShowBidModal(true);
  };

  const handleBidModalClose = () => {
    setShowBidModal(false);
    setBidAmount('');
  };

  const handleCardModalClose = () => {
    setShowCardModal(false);
    setCardInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleSaveCard = async () => {
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
      alert('Por favor, completa toda la información de la tarjeta.');
      return;
    }

    try {
      const responseUser = await fetch(`http://localhost:5000/api/users/${userEmail}`);
      const dataUser = await responseUser.json();
      const cardData = {
        FullName: cardInfo.cardName,
        CardNumber: cardInfo.cardNumber,
        ID: 123,
        Bank: "bancolombia",
        CVC: cardInfo.cvv,
        ExpirationDate: cardInfo.expiryDate,
        IdUser: dataUser[0].iduser,
      };

      const response = await fetch('http://localhost:5000/api/pay_methods/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        const newCard = await response.json();
        setSavedCards([...savedCards, newCard]);
        alert('Tarjeta registrada exitosamente.');
        handleCardModalClose();
        setShowCardSelectionModal(true);
      } else {
        alert('Error al registrar la tarjeta.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    }
  };

  const handleBidSubmit = () => {
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

    setShowBidModal(false);
    setShowCardSelectionModal(true);
  };

  const handleCardSelectionClose = () => {
    setShowCardSelectionModal(false);
    setSelectedCard(null);
  };

  const handleConfirmPayment = async () => {
    if (!selectedCard) {
      alert('Por favor, selecciona una tarjeta para continuar.');
      return;
    }

    const enteredBid = parseFloat(bidAmount);
    const instantBuyPrice = parseFloat(product.instantBuyPrice);

    try {
      const responseUser = await fetch(`http://localhost:5000/api/users/${userEmail}`);
      const dataUser = await responseUser.json();
      let ImmPur = false;
      if (enteredBid >= instantBuyPrice) {
        ImmPur = true;
      }

      const bidData = {
        IdItem: product.id,
        IdBidder: dataUser[0].iduser,
        Price: enteredBid,
        BidDate: new Date().toISOString(),
        ImmediatePurchase: ImmPur,
      };

      const response = await fetch('http://localhost:5000/api/bids/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      });

      if (response.ok) {
        if (ImmPur) {
          const purchaseData = {
            ...product,
            purchaseDate: new Date(),
            purchasePrice: instantBuyPrice,
          };
          onPurchase(purchaseData);
          alert(`¡Compra realizada exitosamente! Has adquirido ${product.name} por ${formatCurrency(instantBuyPrice)}`);
          onBack();
        } else {
          alert(`Tu oferta de ${formatCurrency(enteredBid)} ha sido registrada para el producto: ${product.name}`);
        }
        setShowCardSelectionModal(false);
      } else {
        alert('Error al procesar la puja.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    }
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
            <span className="navbar-text me-3">Bienvenido, {userName}</span>
            <button
              className="btn btn-outline-primary"
              onClick={onBack}
              style={{
                borderColor: '#3498db',
                color: '#3498db',
                transition: 'all 0.3s ease',
              }}
            >
              <MdArrowBack className="me-2" />
              Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <div className="row g-0">
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
                    className="btn btn-warning btn-lg"
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

      {/* Modal de Puja */}
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
                        parseFloat(product.BidPrice) + parseFloat(product.minBidIncrement)
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

      {/* Modal de Selección de Tarjeta */}
      {showCardSelectionModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  <MdPayment className="me-2" />
                  Selecciona una Tarjeta
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCardSelectionClose}
                ></button>
              </div>
              <div className="modal-body">
                {savedCards.length > 0 ? (
                  <div className="saved-cards-container">
                    {savedCards.map((card) => (
                      <div
                        key={card.idpay_method}
                        className={`card-option ${
                          selectedCard?.idpay_method === card.idpay_method ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedCard(card)}
                      >
                        <div className="card-badge">
                          <MdCreditCard size={24} />
                        </div>
                        <div className="card-info">
                          <div className="card-number">
                            •••• •••• •••• {card.CardNumber.slice(-4)}
                          </div>
                          <div className="card-name">{card.FullName}</div>
                        </div>
                        <input
                          type="radio"
                          className="card-radio"
                          checked={selectedCard?.idpay_method === card.idpay_method}
                          onChange={() => setSelectedCard(card)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <MdCreditCard size={48} className="text-muted mb-3" />
                    <p className="text-muted">No tienes tarjetas registradas</p>
                  </div>
                )}
                
                <button
                  className="add-card-button"
                  onClick={() => {
                    setShowCardSelectionModal(false);
                    setShowCardModal(true);
                  }}
                >
                  <MdAdd size={20} className="me-2" />
                  Agregar nueva tarjeta
                </button>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary"
                  onClick={handleCardSelectionClose}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmPayment}
                  disabled={!selectedCard}
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro de Tarjeta */}
      {showCardModal && (
  <div
    className="modal show fade d-block"
    tabIndex="-1"
    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Registrar Tarjeta</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCardModalClose}
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
                maxLength="16"
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">
                Fecha de Expiración (MM/AA)
              </label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                name="expiryDate"
                value={cardInfo.expiryDate}
                onChange={handleCardInfoChange}
                placeholder="MM/AA"
                maxLength="10"
                pattern="\d{2}\/\d{2}"
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
                maxLength="4"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={handleCardModalClose}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSaveCard}>
            Guardar Tarjeta
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