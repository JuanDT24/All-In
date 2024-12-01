// ProductPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function ProductPage({ userName, product, onLogoClick, onBack }) {
  if (!product) {
    return (
      <div>
        <p>Producto no encontrado.</p>
        <button onClick={onBack} className="btn btn-secondary">
          Volver
        </button>
      </div>
    );
  }

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
          <div className="collapse navbar-collapse">
            <span className="navbar-text ms-auto">Bienvenido, {userName}</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <button onClick={onBack} className="btn btn-secondary mb-4">
          Volver
        </button>
        <div className="card mb-4">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={product.image}
                className="img-fluid rounded-start"
                alt={product.name}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#f0f0f0',
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.price}</p>
                <p className="card-text">
                  {product.description || 'Descripción no disponible.'}
                </p>
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#001f3f',
                    borderColor: '#001f3f',
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
