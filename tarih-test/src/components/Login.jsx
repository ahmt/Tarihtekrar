import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './componentscss/Form.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Giriş başarılı!');
      navigate('/');
    } catch (error) {
      toast.error('Giriş başarısız: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      <p>
        Henüz hesabınız yok mu? <Link to="/signup">Kayıt Ol</Link>
      </p>
    </div>
  );
};

export default Login;
