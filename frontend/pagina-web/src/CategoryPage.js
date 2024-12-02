// CategoryPage.js
import React, { useState } from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function CategoryPage({
  userName,
  selectedCategoryId,
  onLogoClick,
  onProductSelect,
  products,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const category = categories.find((cat) => cat.id === selectedCategoryId);

  // Filtrar productos que pertenecen a la categoría seleccionada
  const categoryProducts = products.filter(
    (product) => product.categoryId === selectedCategoryId
  );

  // Filtrar productos según el término de búsqueda
  const filteredProducts = categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Buscar productos..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: '300px' }}
              />
            </form>
            <span className="navbar-text ms-3">Bienvenido, {userName}</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <h2 className="mb-4">
          {category ? `Productos en ${category.name}` : 'Categoría no encontrada'}
        </h2>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: '300px',
                      width: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: '#001f3f',
                        borderColor: '#001f3f',
                      }}
                      onClick={() => onProductSelect(product)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No se encontraron productos.</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <button onClick={onLogoClick} className="btn btn-secondary">
            Volver a categorías
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
