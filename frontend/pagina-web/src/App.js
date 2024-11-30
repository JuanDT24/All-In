import React, { useState } from 'react';
import Login from './login';
import MainPage from './MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Cambia a la página principal
  };

  return (
    <div>
      {isLoggedIn ? <MainPage /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
