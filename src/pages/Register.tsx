import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { RegisterData } from '../types';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => api.auth.register(data),
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/');
    },
    onError: () => {
      setError('Registration failed. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    registerMutation.mutate({
      username: formData.username,
      password: formData.password
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
          >
            {registerMutation.isPending ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
