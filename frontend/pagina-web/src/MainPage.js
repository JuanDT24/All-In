import React from 'react';

function MainPage() {
  return (
    <div
      className="container mt-5"
      style={{ textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
    >
      <h1>Bienvenido a All In</h1>
      <p>Explora productos y comienza tu experiencia de compra.</p>
      <div className="mt-5">
        <button className="btn btn-primary">Ver Productos</button>
      </div>
    </div>
  );
}

export default MainPage;
