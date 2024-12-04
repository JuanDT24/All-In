// CategoryPage.js
import React, { useState, useEffect } from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import { MdArrowBack, MdSearch } from 'react-icons/md';

function CategoryPage({
  userName,
  selectedCategoryId,
  onLogoClick,
  onProductSelect,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = categories.find((cat) => cat.id === selectedCategoryId);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/items/get-items-category/${selectedCategoryId}`);
        if (!response.ok) throw new Error('Error al cargar los productos.');
        
        const data = await response.json();
        
        const adaptedProducts = data.map(product => ({
          id: product.iditem,          
          name: product.name,          
          categoryId: product.idcategory, 
          description: product.description,
          BidPrice: product.price,
          instantBuyPrice: product.immediatepurchaseprice,
          auctionEndDate: product.duedate,
          minBidIncrement: product.minimumincrease,
          image: `http://localhost:5000/api/items/get-item-image/${product.iditem}`
        }));
        
        setProducts(adaptedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [selectedCategoryId]);

  const categoryProducts = products.filter(
    (product) => product.categoryId === selectedCategoryId
  );

  const filteredProducts = categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
    }}>
      <nav className="navbar navbar-expand-lg sticky-top" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
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

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: '20px',
                  paddingLeft: '40px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              />
              <MdSearch 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
                size={20}
              />
            </div>
            <span className="navbar-text me-3">Bienvenido, {userName}</span>
            <button 
              className="btn btn-outline-primary"
              onClick={onLogoClick}
              style={{
                borderColor: '#3498db',
                color: '#3498db',
                borderRadius: '20px',
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
        <h2 
          className="mb-4 text-center" 
          style={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {category ? `Productos en ${category.name}` : 'Categoría no encontrada'}
        </h2>
        
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-md-4 col-lg-3" key={product.id}>
                <div 
                  className="card border-0 h-100 product-card"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white'
                  }}
                >
                  <div className="position-relative">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        ${product.BidPrice}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-3" style={{ fontWeight: 600 }}>
                      {product.name}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-primary fw-bold">
                        Compra inmediata: ${product.instantBuyPrice}
                      </span>
                      <button
                        onClick={() => onProductSelect(product)}
                        className="btn btn-outline-primary"
                        style={{
                          borderWidth: '2px',
                          fontWeight: 600,
                          borderRadius: '20px'
                        }}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-5">
            <div 
              className="alert"
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <p className="mb-0" style={{ fontSize: '1.1rem', color: '#64748b' }}>
                No hay productos disponibles en esta categoría
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-card {
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        .product-card:hover .card-img-top {
          transform: scale(1.05);
        }
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          border-color: transparent;
        }
        .form-control:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
        }
      `}</style>
    </div>
  );
}

export default CategoryPage;