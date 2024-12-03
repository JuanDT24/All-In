import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function MisVentasPage({ userName, onLogoClick, misVentas }) {
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
            <span className="navbar-text me-3">
              Bienvenido, {userName}
            </span>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container py-5">
        <h2 className="mb-5 text-center" style={{ fontWeight: 700 }}>
          Mis Ventas
        </h2>
        {misVentas.length > 0 ? (
          <div className="row g-4">
            {misVentas.map((venta) => (
              <div className="col-md-4" key={venta.id}>
                <div
                  className="card border-0 h-100 shadow-sm"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={venta.image}
                    className="card-img-top"
                    alt={venta.name}
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
                      {venta.name}
                    </h5>
                    <p className="card-text mb-3">
                      <strong>Precio:</strong> ${venta.instantBuyPrice}
                    </p>
                    <p className="text-muted mb-4">
                      Subastado el: {new Date(venta.auctionEndDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="alert alert-light text-center"
            role="alert"
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#2c3e50',
            }}
          >
            No has realizado ventas.
          </div>
        )}
      </div>

      <style>{`
        .transform-on-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default MisVentasPage;
