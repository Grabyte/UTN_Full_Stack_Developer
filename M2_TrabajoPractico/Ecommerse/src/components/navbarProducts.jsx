import { useState } from 'react';

export function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="nav-right">
          <button>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}