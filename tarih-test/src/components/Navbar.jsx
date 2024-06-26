import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  return (
    <nav>
      <div className="brand">
        Tarih<span>Tekrar</span>.com
      </div>
      <div>
        <Link to="/">Anasayfa</Link>
        <Link to="/questions">Sorular</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Giriş Yap</Link>
        <Link to="/signup">Kayıt Ol</Link>
      </div>
    </nav>
  );
};

export default NavBar;
