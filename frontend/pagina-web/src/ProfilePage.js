// ProfilePage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function ProfilePage({ userName, onLogoClick }) {
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
        <h2>Perfil de {userName}</h2>
        {/* Aquí puedes mostrar más información del usuario si la tienes */}
        <p>Información del perfil en construcción.</p>
      </div>
    </div>
  );
}

export default ProfilePage;