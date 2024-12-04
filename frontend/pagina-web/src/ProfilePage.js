// ProfilePage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import { MdEmail, MdPhone, MdLocationOn, MdPerson, MdArrowBack } from 'react-icons/md';

function ProfilePage({ userName, currentUser, onLogoClick }) {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
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
          <div className="collapse navbar-collapse justify-content-end">
            <span className="navbar-text me-3">Bienvenido, {userName}</span>
            <button 
              className="btn btn-outline-light"
              onClick={onLogoClick}
            >
              <MdArrowBack className="me-2" />
              Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div 
                className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ 
                  width: '100px', 
                  height: '100px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                }}
              >
                <MdPerson size={50} color="white" />
              </div>
              <h2 className="fw-bold mt-3" style={{ color: '#1a1c1e' }}>
                {currentUser.name} {currentUser.lastname}
              </h2>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="list-group">
                  <div className="list-group-item border-0 bg-transparent mb-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle p-3 me-3"
                        style={{ 
                          background: 'rgba(79, 70, 229, 0.1)'
                        }}
                      >
                        <MdEmail style={{ color: '#4f46e5' }} size={24} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <span className="fw-medium">{currentUser.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="list-group-item border-0 bg-transparent mb-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle p-3 me-3"
                        style={{ 
                          background: 'rgba(79, 70, 229, 0.1)'
                        }}
                      >
                        <MdPhone style={{ color: '#4f46e5' }} size={24} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Teléfono</small>
                        <span className="fw-medium">
                          {currentUser.phonenumber || currentUser.PhoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="list-group-item border-0 bg-transparent mb-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle p-3 me-3"
                        style={{ 
                          background: 'rgba(79, 70, 229, 0.1)'
                        }}
                      >
                        <MdLocationOn style={{ color: '#4f46e5' }} size={24} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Dirección</small>
                        <span className="fw-medium">
                          {currentUser.address || currentUser.Address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .card {
          transition: all 0.3s ease;
          border: none;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .list-group-item {
          transition: all 0.2s ease;
          border-radius: 8px;
        }
        .list-group-item:hover {
          background-color: rgba(79, 70, 229, 0.05) !important;
        }
      `}</style>
    </div>
  );
}

export default ProfilePage;