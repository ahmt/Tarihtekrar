import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import './componentscss/Form.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Çıkış başarılı!');
      navigate('/login');
    } catch (error) {
      toast.error('Çıkış başarısız: ' + error.message);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;
