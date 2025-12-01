import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';

export const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: api.login,
    onSuccess: (user) => {
      login(user);
      navigate('/my-tickets');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '20px' }}>Вход</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Username"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        {mutation.error && <span className="error-text">{mutation.error.message}</span>}
        <button disabled={mutation.isPending} className="btn" style={{ width: '100%' }}>
          {mutation.isPending ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', color: '#888' }}>
        Нет аккаунта? <Link to="/register" style={{ color: 'var(--primary)' }}>Зарегистрироваться</Link>
      </p>
    </div>
  );
};