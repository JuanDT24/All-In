import React from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function MainPage({ userName, onCategorySelect, onLogoClick, onSellClick }) {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
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
          <button
            className="btn btn-outline-light ms-3"
            onClick={onSellClick} // Llamar a la función para subastar
          >
            Subastar
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="mb-4">Categorías</h2>
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                  style={{
                    height: '300px',
                    width: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.name}</h5>
                  <button
                    onClick={() => onCategorySelect(category.id)}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: '#001f3f',
                      borderColor: '#001f3f',
                    }}
                  >
                    Ver Productos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
