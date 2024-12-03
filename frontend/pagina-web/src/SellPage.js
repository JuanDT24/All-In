// SellPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from './categories';
import logo from './Logo.png';

function SellPage({ userName, onLogoClick, onProductSubmit }) {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
   
    description: '',
    image: null,
    auctionEndDate: '',        // Fecha de terminación de la subasta
    auctionPrice: '',          // Precio de subasta
    instantBuyPrice: '',       // Precio de compra inmediata
    minBidIncrement: '',       // Mínimo para la puja
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

      !formData.description ||
      !formData.image ||
      !formData.auctionEndDate ||
      !formData.auctionPrice ||
      !formData.instantBuyPrice ||
      !formData.minBidIncrement
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear un objeto de producto
    const newProduct = {
      id: Date.now(), // Usamos la marca de tiempo como ID único
      name: formData.name,
  
      description: formData.description,
      categoryId: parseInt(formData.categoryId),
      image: URL.createObjectURL(formData.image), // Creamos una URL para la imagen
      auctionStartDate: new Date().toISOString(), // Fecha actual en formato ISO
      auctionEndDate: formData.auctionEndDate,
      auctionPrice: formData.auctionPrice,
      instantBuyPrice: formData.instantBuyPrice,
      minBidIncrement: formData.minBidIncrement,
    };

    // Llamamos a la función para agregar el producto
    onProductSubmit(newProduct);

    // Reiniciamos el formulario
    setFormData({
      categoryId: '',
      name: '',
  
      description: '',
      image: null,
      auctionEndDate: '',
      auctionPrice: '',
      instantBuyPrice: '',
      minBidIncrement: '',
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

  

          {/* Precio de subasta */}
          <div className="mb-3">
            <label htmlFor="auctionPrice" className="form-label">
              Precio de Subasta
            </label>
            <input
              type="number"
              id="auctionPrice"
              name="auctionPrice"
              className="form-control"
              value={formData.auctionPrice}
              onChange={handleInputChange}
            />
          </div>

          {/* Precio de compra inmediata */}
          <div className="mb-3">
            <label htmlFor="instantBuyPrice" className="form-label">
              Precio de Compra Inmediata
            </label>
            <input
              type="number"
              id="instantBuyPrice"
              name="instantBuyPrice"
              className="form-control"
              value={formData.instantBuyPrice}
              onChange={handleInputChange}
            />
          </div>

          {/* Mínimo para la puja */}
          <div className="mb-3">
            <label htmlFor="minBidIncrement" className="form-label">
              Mínimo para la Puja
            </label>
            <input
              type="number"
              id="minBidIncrement"
              name="minBidIncrement"
              className="form-control"
              value={formData.minBidIncrement}
              onChange={handleInputChange}
            />
          </div>

          {/* Fecha de terminación de la subasta */}
          <div className="mb-3">
            <label htmlFor="auctionEndDate" className="form-label">
              Fecha de Terminación de la Subasta
            </label>
            <input
              type="datetime-local"
              id="auctionEndDate"
              name="auctionEndDate"
              className="form-control"
              value={formData.auctionEndDate}
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
