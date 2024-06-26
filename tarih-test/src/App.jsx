import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import QuestionList from './components/QuestionList';  // Bileşen adı güncellendi
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Çıkış başarılı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yaparken hata oluştu.');
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Anasayfa</Link></li>
          <li><Link to="/questions">Sorular</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Giriş Yap</Link></li>
              <li><Link to="/signup">Kayıt Ol</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button className='logout' onClick={handleLogout}>Çıkış Yap</button></li>
            </>
          )}
        </ul>
      </nav>
      <div className="ad-container">
        <div className="ad ad-left">Reklam Alanı</div>
        <div className="ad ad-right">Reklam Alanı</div>
      </div>
      <div className="outer-container">
        <div className="inner-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<QuestionList />} />  // Bileşen adı güncellendi
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 KPSS Tarih Soruları. Tüm hakları saklıdır.</p>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
