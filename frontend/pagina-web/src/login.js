// login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png'; // Asegúrate de que la ruta es correcta

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login y registro
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastname: '',
    phonenumber: '',
    address: '',
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejadores de botones
  const handleSubmit = async () => {
    if (isRegistering) {
      // Validación básica antes de enviar
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      const requestData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        LastName: formData.lastname,
        PhoneNumber: formData.phonenumber,
        Address: formData.address,
      };

      console.log("JSON que se enviará:", requestData); // Inspeccionar el JSON antes de enviarlo
      try {
        const response = await fetch('http://localhost:5000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        if (response.ok) {
          alert('Usuario registrado exitosamente');
          setIsRegistering(false); // Cambia al modo de login después de registrar
        } else {
          alert(`Error: ${data.message || 'Ocurrió un error al registrar'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${formData.email}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Datos recibidos:", data);
          // Verifica si data es un array y tiene al menos un elemento
          if (data.length > 0 && data[0].password === formData.password) {
            alert('Inicio de sesión exitoso');
            onLogin(formData.email); // Pasamos el email al componente padre
          } else {
            alert('Contraseña incorrecta');
          }
        } else if (response.status === 404) {
          // Usuario no encontrado
          alert('Usuario no encontrado. Por favor, regístrese.');
        } else {
          // Otro error
          const data = await response.json();
          alert(`Error: ${data.message || 'Error al iniciar sesión'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
      }
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
          {/* Campos que aparecen en ambos modos */}
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

          {/* Campos adicionales para el registro */}
          {isRegistering && (
            <>
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

              <div className="mb-3">
                <label
                  htmlFor="lastname"
                  className="form-label"
                  style={{ color: '#001f3f' }}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Ingresa tu apellido"
                  className="form-control"
                  style={{ borderColor: '#001f3f' }}
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="phonenumber"
                  className="form-label"
                  style={{ color: '#001f3f' }}
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Ingresa tu número de teléfono"
                  className="form-control"
                  style={{ borderColor: '#001f3f' }}
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="address"
                  className="form-label"
                  style={{ color: '#001f3f' }}
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Ingresa tu dirección"
                  className="form-control"
                  style={{ borderColor: '#001f3f' }}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </>
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
