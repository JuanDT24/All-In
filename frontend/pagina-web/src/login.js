// login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png'; // Asegúrate de que la ruta es correcta

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login y registro
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejadores de botones
  const handleSubmit = () => {
    if (isRegistering) {
      // Lógica de registro
      console.log('Usuario registrado:', formData);
      // Aquí podrías agregar lógica para guardar el nombre del usuario
    } else {
      // Lógica de inicio de sesión
      console.log('Inicio de sesión con:', formData.email);
      onLogin(formData.name || formData.email); // Pasamos el nombre o email al App
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #001f3f, #004080)',
        color: '#fff',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="p-4 bg-white rounded shadow-lg text-center"
        style={{ width: '360px' }}
      >
        {/* Encabezado */}
        <div className="mb-4">
          <img
            src={logo}
            alt="Logo de All In"
            className="mb-3"
            style={{ width: '80px', height: '80px' }}
          />
          <h1
            style={{ fontSize: '1.8rem', color: '#001f3f', fontWeight: '700' }}
          >
            {isRegistering ? 'Registro' : 'All In'}
          </h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            {isRegistering
              ? 'Completa tus datos para crear una cuenta'
              : 'Inicia sesión para continuar'}
          </p>
        </div>
        {/* Formulario */}
        <form>
          {isRegistering && (
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label"
                style={{ color: '#001f3f' }}
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ingresa tu nombre"
                className="form-control"
                style={{ borderColor: '#001f3f' }}
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: '#001f3f' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              className="form-control"
              style={{ borderColor: '#001f3f' }}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: '#001f3f' }}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="form-control"
              style={{ borderColor: '#001f3f' }}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {isRegistering && (
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="form-label"
                style={{ color: '#001f3f' }}
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                className="form-control"
                style={{ borderColor: '#001f3f' }}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary w-100"
            style={{
              background: '#001f3f',
              borderColor: '#001f3f',
              transition: '0.3s',
            }}
            onClick={handleSubmit}
          >
            {isRegistering ? 'Registrar' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-3">
          <button
            className="btn btn-link"
            style={{ color: '#004080', textDecoration: 'none' }}
            onClick={() => setIsRegistering(!isRegistering)} // Alterna entre login y registro
          >
            {isRegistering
              ? '¿Ya tienes una cuenta? Inicia sesión'
              : '¿No tienes una cuenta? Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;