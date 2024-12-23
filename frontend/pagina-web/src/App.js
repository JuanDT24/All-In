// App.js
import React, { useState } from 'react';
import Login from './login';
import MainPage from './MainPage';
import CategoryPage from './CategoryPage';
import ProductPage from './productpage';
import SellPage from './SellPage';
import ProfilePage from './ProfilePage';
import MisComprasPage from './MisComprasPage';
import MisVentasPage from './MisVentaPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // Almacenar productos subastados por usuarios
  const [misCompras, setMisCompras] = useState([]); // Almacenar compras del usuario
  const [misVentas, setMisVentas] = useState([]); // Almacenar ventas del usuario
  const [currentUser, setCurrentUser] = useState(null); // Almacenar datos completos del usuario
  const[userEmail,setUserEmail]=useState("");
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserName(userData.name);
    setCurrentUser(userData); // Guardamos toda la información del usuario
    setUserEmail(userData.email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('main');
    setSelectedCategoryId(null);
    setSelectedProduct(null);
    setCurrentUser(null); // Limpiamos la información del usuario
    // Limpia cualquier otro estado si es necesario
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
    setMisVentas([...misVentas, newProduct]); // Agregar a mis ventas
  };

  const handleSellClick = () => {
    setCurrentPage('sell'); // Navegar a la página de subasta
  };

  const handleLogoClick = () => {
    setCurrentPage('main');
    setSelectedCategoryId(null);
    setSelectedProduct(null);
  };

  const handleProfileClick = (section) => {
    if (section === 'compras') {
      setCurrentPage('misCompras');
    } else if (section === 'ventas') {
      setCurrentPage('misVentas');
    } else {
      setCurrentPage('perfil');
    }
  };

  const handlePurchase = (product) => {
    // Agregar el producto a mis compras
    setMisCompras([...misCompras, product]);

    // Remover el producto de la lista de productos disponibles
    setProducts(products.filter((p) => p.id !== product.id));

    // Opcional: Agregar lógica para actualizar el estado del producto, marcarlo como vendido, etc.
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {currentPage === 'main' && (
        <MainPage
          userName={userName}
          userEmail={userEmail}
          onCategorySelect={handleCategorySelect}
          onLogoClick={handleLogoClick}
          onSellClick={handleSellClick}
          onLogoutClick={handleLogout}
          onProfileClick={handleProfileClick}
        />
      )}
      {currentPage === 'category' && (
        <CategoryPage
          userName={userName}
          userEmail={userEmail}
          selectedCategoryId={selectedCategoryId}
          onLogoClick={handleLogoClick}
          onProductSelect={handleProductSelect}
          products={products}
        />
      )}
      {currentPage === 'product' && (
        <ProductPage
          userName={userName}
          userEmail={userEmail}
          product={selectedProduct}
          onLogoClick={handleLogoClick}
          onBack={() => setCurrentPage('category')}
          onPurchase={handlePurchase}
        />
      )}
      {currentPage === 'sell' && (
        <SellPage
          userName={userName}
          userEmail={userEmail}
          onLogoClick={handleLogoClick}
          onProductSubmit={handleProductSubmit}
        />
      )}
      {currentPage === 'perfil' && (
        <ProfilePage
          userName={userName}
          userEmail={userEmail}
          currentUser={currentUser}
          onLogoClick={handleLogoClick}
        />
      )}
      {currentPage === 'misCompras' && (
        <MisComprasPage
          userName={userName}
          userEmail={userEmail}
          onLogoClick={handleLogoClick}
          misCompras={misCompras}
        />
      )}
      {currentPage === 'misVentas' && (
        <MisVentasPage
          userName={userName}
          userEmail={userEmail}
          onLogoClick={handleLogoClick}
          misVentas={misVentas}
        />
      )}
    </div>
  );
}

export default App;