// SellPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from './categories';
import logo from './Logo.png';

function SellPage({ userName, onLogoClick, onProductSubmit }) {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    price: '',
    description: '',
    image: null,
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // Maneja la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Manejador del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (
      !formData.categoryId ||
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.image
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear un objeto de producto
    const newProduct = {
      id: Date.now(), // Usamos la marca de tiempo como ID único
      name: formData.name,
      price: formData.price,
      description: formData.description,
      categoryId: parseInt(formData.categoryId),
      image: URL.createObjectURL(formData.image), // Creamos una URL para la imagen
    };

    // Llamamos a la función para agregar el producto
    onProductSubmit(newProduct);

    // Reiniciamos el formulario
    setFormData({
      categoryId: '',
      name: '',
      price: '',
      description: '',
      image: null,
    });

    // Navegamos de vuelta a la página principal o a la categoría
    onLogoClick();
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
            <span className="navbar-text ms-auto">Bienvenido, {userName}</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <h2 className="mb-4">Subastar Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Categoría */}
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="form-select"
              value={formData.categoryId}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre del producto */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Precio */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Precio
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Imagen */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Imagen del Producto
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: '#001f3f',
              borderColor: '#001f3f',
            }}
          >
            Publicar Producto
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellPage;
