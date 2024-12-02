// MainPage.js
import React, { useState } from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function MainPage({ userName, onCategorySelect, onLogoClick, onSellClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar categorías según el término de búsqueda
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <div className="collapse navbar-collapse">
            <form className="d-flex ms-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar categorías..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: '300px' }}
              />
            </form>
            <span className="navbar-text ms-3">Bienvenido, {userName}</span>
            <button
              className="btn btn-outline-light ms-3"
              onClick={onSellClick}
            >
              Subastar
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <h2 className="mb-4">Categorías</h2>
        <div className="row">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
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
                      backgroundColor: '#f0f0f0', // Opcional
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
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No se encontraron categorías.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
