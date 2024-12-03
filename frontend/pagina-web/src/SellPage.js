// SellPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import { MdArrowBack, MdCloudUpload } from 'react-icons/md';
import categories from './categories';

function SellPage({ userName, onLogoClick, onProductSubmit, userEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    auctionPrice: '',
    instantBuyPrice: '',
    minBidIncrement: '',
    auctionEndDate: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Obtener información del usuario
      const response = await fetch(`http://localhost:5000/api/users/${userEmail}`);
      const dataUser = await response.json();

      // Crear nuevo producto para el estado local
      const newProduct = {
        name: formData.name,
        description: formData.description,
        categoryId: parseInt(formData.categoryId),
        image: URL.createObjectURL(formData.image),
        auctionStartDate: new Date().toISOString(),
        auctionEndDate: formData.auctionEndDate,
        auctionPrice: formData.auctionPrice,
        instantBuyPrice: formData.instantBuyPrice,
        minBidIncrement: formData.minBidIncrement,
      };

      // Llamar a la función para agregar el producto al estado
      onProductSubmit(newProduct);

      // Preparar datos para enviar al servidor
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('idseller', dataUser[0].iduser);
      formDataToSend.append('current_price', formData.auctionPrice);
      formDataToSend.append('starting_price', formData.auctionPrice);
      formDataToSend.append('inmediate_purchase_price', formData.instantBuyPrice);
      formDataToSend.append('minimum_increase', formData.minBidIncrement);
      formDataToSend.append('post_date', new Date().toISOString());
      formDataToSend.append('start_date', new Date().toISOString());
      formDataToSend.append('due_date', formData.auctionEndDate);
      formDataToSend.append('idcategory', parseInt(formData.categoryId));
      formDataToSend.append('image', formData.image);

      // Enviar al servidor
      const submitResponse = await fetch('http://localhost:5000/api/items/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!submitResponse.ok) {
        throw new Error('Error al crear el producto');
      }

      alert('Producto creado exitosamente');
      onLogoClick();
    } catch (error) {
      setError(error.message);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
    }}>
      <nav className="navbar navbar-expand-lg" style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div className="container">
          <button
            className="navbar-brand btn btn-link p-0 m-0 d-flex align-items-center"
            onClick={onLogoClick}
            style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: 700 }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '45px', height: '45px', marginRight: '15px', borderRadius: '50%' }}
            />
            All In
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <span className="navbar-text me-3">Bienvenido, {userName}</span>
            <button 
              className="btn btn-outline-primary"
              onClick={onLogoClick}
              style={{
                borderColor: '#3498db',
                color: '#3498db',
                transition: 'all 0.3s ease'
              }}
            >
              <MdArrowBack className="me-2" />
              Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <h2 className="text-center mb-4" style={{ fontWeight: 700, color: '#2c3e50' }}>
                  Publicar Nuevo Producto
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Nombre del Producto</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Categoría</label>
                        <select
                          name="categoryId"
                          className="form-select"
                          value={formData.categoryId}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Precio Inicial</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            name="auctionPrice"
                            className="form-control"
                            value={formData.auctionPrice}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Precio de Compra Inmediata</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            name="instantBuyPrice"
                            className="form-control"
                            value={formData.instantBuyPrice}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Incremento Mínimo</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            name="minBidIncrement"
                            className="form-control"
                            value={formData.minBidIncrement}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Fecha de Cierre</label>
                        <input
                          type="datetime-local"
                          name="auctionEndDate"
                          className="form-control"
                          value={formData.auctionEndDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <textarea
                          name="description"
                          className="form-control"
                          rows="4"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-4">
                        <label className="form-label fw-bold">Imagen del Producto</label>
                        <div 
                          className="drop-zone p-4 text-center border rounded-3"
                          style={{
                            backgroundColor: '#f8fafc',
                            border: '2px dashed #e2e8f0',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="image" style={{ cursor: 'pointer' }}>
                            <MdCloudUpload size={48} className="text-primary mb-2" />
                            <p className="mb-0">
                              {previewImage ? 'Cambiar imagen' : 'Subir imagen del producto'}
                            </p>
                          </label>
                          {previewImage && (
                            <div className="mt-3">
                              <img
                                src={previewImage}
                                alt="Preview"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '200px',
                                  borderRadius: '8px'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-2"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '500'
                      }}
                    >
                      {loading ? 'Publicando...' : 'Publicar Producto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-control, .form-select {
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }
        .form-control:focus, .form-select:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
        }
        .input-group-text {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px 0 0 8px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        .drop-zone:hover {
          border-color: #3498db;
          background-color: #f0f9ff;
        }
      `}</style>
    </div>
  );
}

export default SellPage;