// MisComprasPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function MisComprasPage({ userName, onLogoClick, misCompras }) {
  return (
    <div>
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

      <div className="container mt-4">
        <h2>Mis Compras</h2>
        {misCompras.length > 0 ? (
          <div className="row">
            {misCompras.map((compra) => (
              <div className="col-md-4 mb-4" key={compra.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={compra.image}
                    className="card-img-top"
                    alt={compra.name}
                    style={{
                      height: '200px',
                      objectFit: 'contain',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{compra.name}</h5>
                    <p className="card-text">Precio: {compra.price}</p>
                    {/* Otros detalles */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No has realizado compras.</p>
        )}
      </div>
    </div>
  );
}

export default MisComprasPage;