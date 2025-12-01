import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';

export const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: api.registerWithPass,
    onSuccess: (user) => {
      login(user);
      navigate('/my-tickets');
    },
    onError: (err) => setError(err.message)
  });

  const validate = () => {
    if (formData.username.length < 8) return 'Username должен быть не менее 8 символов';
    if (formData.password.length < 8) return 'Пароль должен быть не менее 8 символов';
    if (!/[A-Z]/.test(formData.password)) return 'Пароль должен содержать заглавную букву';
    if (!/[0-9]/.test(formData.password)) return 'Пароль должен содержать цифру';
    if (formData.password !== formData.confirmPassword) return 'Пароли не совпадают';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    mutation.mutate(formData);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '20px' }}>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Username (min 8 chars)"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password (min 8 chars, 1 Upper, 1 Digit)"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {error && <span className="error-text">{error}</span>}
        <button disabled={mutation.isPending} className="btn" style={{ width: '100%' }}>
          {mutation.isPending ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};