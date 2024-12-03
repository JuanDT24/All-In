import React, { useState, useEffect } from 'react';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';

function CategoryPage({
  userName,
  selectedCategoryId,
  onLogoClick,
  onProductSelect,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); // Almacena los productos obtenidos
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
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
          <div className="collapse navbar-collapse">
            <form className="d-flex ms-auto align-items-center">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  className="form-control border-start-0"
                  type="search"
                  placeholder="Buscar productos..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ 
                    boxShadow: 'none',
                    maxWidth: '300px' 
                  }}
                />
              </div>
              <span className="navbar-text ms-3">Bienvenido, {userName}</span>
            </form>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 
          className="mb-5 text-center" 
          style={{ 
            fontWeight: 700,
            color: '#2c3e50' 
          }}
        >
          {category ? `Productos en ${category.name}` : 'Categoría no encontrada'}
        </h2>
        
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
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
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
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
                      {product.name}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span 
                        className="h5 mb-0" 
                        style={{ 
                          color: '#27ae60', // Cambié el color para diferenciarlo, opcional
                          fontWeight: 600 
                        }}
                      >
                        <strong>Precio:</strong> ${product.BidPrice}
                      </span>
                      <button
                        onClick={() => onProductSelect(product)}
                        className="btn btn-outline-primary"
                        style={{
                          borderWidth: '2px',
                          fontWeight: 600
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
          <div 
            className="alert alert-light text-center" 
            role="alert"
          >
            No hay productos en esta categoría.
          </div>
        )}
      </div>

      <style>{`
        .transform-on-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default CategoryPage;
