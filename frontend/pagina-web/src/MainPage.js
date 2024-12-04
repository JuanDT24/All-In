// MainPage
import React from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function MainPage({
  userName,
  onCategorySelect,
  onLogoClick,
  onSellClick,
  onLogoutClick,
  onProfileClick,
}) {
  return (
    <div 
      style={{
        fontFamily: "'Roboto', sans-serif", // Cambia la fuente aquí
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        color: '#2c3e50'
      }}
    >
      <nav 
        className="navbar navbar-expand-lg"
        style={{ 
          backgroundColor: '#ffffff', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e9ecef'
        }}
      >
        <div className="container">
          <button
            className="navbar-brand btn btn-link p-0 m-0 d-flex align-items-center"
            onClick={onLogoClick}
            style={{ 
              textDecoration: 'none', 
              color: '#2c3e50', 
              fontWeight: 700 
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ 
                width: '45px', 
                height: '45px', 
                marginRight: '15px',
                borderRadius: '50%'
              }}
            />
            All In
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="dropdown me-3">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="profileMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userName}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="profileMenu"
              >
                {['perfil', 'compras', 'ventas'].map(option => (
                  <li key={option}>
                    <button
                      className="dropdown-item"
                      onClick={() => onProfileClick(option)}
                    >
                      {option === 'perfil' ? 'Perfil' : 
                       option === 'compras' ? 'Mis Compras' : 
                       'Mis Ventas'}
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={onLogoutClick}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary"
              onClick={onSellClick}
              style={{
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                fontWeight: 600
              }}
            >
              Subastar
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="mb-5 text-center" style={{ fontWeight: 700 }}>
          Categorías
        </h2>
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-md-4" key={category.id}>
              <div 
                className="card border-0 h-100 transform-on-hover"
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                  style={{
                    height: '250px',
                    width: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.9)'
                  }}
                />
                <div 
                  className="card-body text-center"
                  style={{ 
                    backgroundColor: '#ffffff',
                    padding: '1.5rem' 
                  }}
                >
                  <h5 
                    className="card-title mb-3" 
                    style={{ 
                      fontWeight: 600,
                      color: '#2c3e50' 
                    }}
                  >
                    {category.name}
                  </h5>
                  <button
                    onClick={() => onCategorySelect(category.id)}
                    className="btn btn-outline-primary w-100"
                    style={{
                      borderWidth: '2px',
                      fontWeight: 600
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

      <style>{`
        .transform-on-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default MainPage;