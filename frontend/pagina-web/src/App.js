// App.js
import React, { useState } from 'react';
import Login from './login';
import MainPage from './MainPage';
import CategoryPage from './CategoryPage';
import ProductPage from './productpage';
import SellPage from './SellPage';
import initialProducts from './products'; // Renombramos la importación

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'category', 'product', 'sell'
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(initialProducts); // Estado para los productos

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

  const handleLogoClick = () => {
    setCurrentPage('main');
    setSelectedCategoryId(null);
    setSelectedProduct(null);
  };

  const handleBackToCategory = () => {
    setCurrentPage('category');
    setSelectedProduct(null);
  };

  const handleSellClick = () => {
    setCurrentPage('sell');
  };

  const handleProductSubmit = (newProduct) => {
    // Agregamos el nuevo producto al estado
    setProducts([...products, newProduct]);
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
          onSellClick={handleSellClick} // Pasamos el manejador
        />
      )}
      {currentPage === 'category' && (
        <CategoryPage
          userName={userName}
          selectedCategoryId={selectedCategoryId}
          onLogoClick={handleLogoClick}
          onProductSelect={handleProductSelect}
          products={products} // Pasamos los productos
        />
      )}
      {currentPage === 'product' && (
        <ProductPage
          userName={userName}
          product={selectedProduct}
          onLogoClick={handleLogoClick}
          onBack={handleBackToCategory}
        />
      )}
      {currentPage === 'sell' && (
        <SellPage
          userName={userName}
          onLogoClick={handleLogoClick}
          onProductSubmit={handleProductSubmit} // Pasamos el manejador
        />
      )}
    </div>
  );
}

export default App;
