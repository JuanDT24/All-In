import React, { useState } from 'react';
import Login from './login';
import MainPage from './MainPage';
import CategoryPage from './CategoryPage';
import ProductPage from './productpage';
import SellPage from './SellPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // Almacenar productos subastados por usuarios

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('category');
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleProductSubmit = (newProduct) => {
    setProducts([...products, newProduct]); // Agregar nuevo producto
  };

  const handleSellClick = () => {
    setCurrentPage('sell'); // Navegar a la página de subasta
  };

  const handleLogoClick = () => {
    setCurrentPage('main');
    setSelectedCategoryId(null);
    setSelectedProduct(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {currentPage === 'main' && (
        <MainPage
          userName={userName}
          onCategorySelect={handleCategorySelect}
          onLogoClick={handleLogoClick}
          onSellClick={handleSellClick} // Navegar a subasta
        />
      )}
      {currentPage === 'category' && (
        <CategoryPage
          userName={userName}
          selectedCategoryId={selectedCategoryId}
          onLogoClick={handleLogoClick}
          onProductSelect={handleProductSelect}
          products={products} // Pasar productos
        />
      )}
      {currentPage === 'product' && (
        <ProductPage
          userName={userName}
          product={selectedProduct}
          onLogoClick={handleLogoClick}
          onBack={() => setCurrentPage('category')}
        />
      )}
      {currentPage === 'sell' && (
        <SellPage
          userName={userName}
          onLogoClick={handleLogoClick}
          onProductSubmit={handleProductSubmit} // Agregar producto
        />
      )}
    </div>
  );
}

export default App;
