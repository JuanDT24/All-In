// MisComprasPage.js
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import { MdArrowBack } from 'react-icons/md';

function MisComprasPage({userEmail, userName, onLogoClick}) {

  const [purchases, setPurchases] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/get_purchases_user/${userEmail}`);
        if (!response.ok) throw new Error('Error al cargar los productos.');
        
        const data = await response.json();
        
        const adaptedProducts = data.map(purchase => ({
          id: purchase.iditem,          
          name: purchase.name,
          instantBuyPrice: purchase.price,
          auctionEndDate: purchase.startingdate,
          image: `http://localhost:5000/api/items/get-item-image/${purchase.iditem}`
        }));
        
        setPurchases(adaptedProducts);
      } catch (err) {
      }
    };
  
    fetchProducts();
  }, [userEmail]);  
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
            <span className="navbar-text me-3">
              Bienvenido, {userName}
            </span>
            <button 
              className="btn btn-outline-primary"
              onClick={onLogoClick}
              style={{
                borderColor: '#3498db',
                color: '#3498db',
                transition: 'all 0.3s ease'
              }}
            >
              <MdArrowBack className="me-2" />
              Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="mb-5 text-center" style={{ fontWeight: 700 }}>
          Mis Compras
        </h2>
        {purchases.length > 0 ? (
          <div className="row g-4">
            {purchases.map((compra) => (
              <div className="col-md-4" key={compra.id}>
                <div
                  className="card border-0 h-100 shadow-sm transform-on-hover"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={compra.image}
                    className="card-img-top"
                    alt={compra.name}
                    style={{
                      height: '250px',
                      objectFit: 'cover',
                      filter: 'brightness(0.9)',
                    }}
                  />
                  <div
                    className="card-body text-center"
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '1.5rem',
                    }}
                  >
                    <h5
                      className="card-title mb-3"
                      style={{
                        fontWeight: 600,
                        color: '#2c3e50',
                      }}
                    >
                      {compra.name}
                    </h5>
                    <p className="card-text mb-3">
                      <strong>Precio:</strong> ${compra.instantBuyPrice}
                    </p>
                    <p className="text-muted mb-4">
                      Comprado el: {new Date(compra.purchaseDate || Date.now()).toLocaleDateString()}
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <span 
                        className="badge"
                        style={{
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                          padding: '8px 16px',
                          fontSize: '0.9rem'
                        }}
                      >
                        Compra completada
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="alert alert-light text-center p-5"
            role="alert"
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#2c3e50',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            No has realizado compras todavía.
          </div>
        )}
      </div>

      <style>{`
        .transform-on-hover {
          transition: transform 0.3s ease;
        }
        .transform-on-hover:hover {
          transform: translateY(-5px);
        }
        .card-img-top {
          transition: filter 0.3s ease;
        }
        .card:hover .card-img-top {
          filter: brightness(1);
        }
        .btn-outline-primary:hover {
          background-color: #3498db;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default MisComprasPage;