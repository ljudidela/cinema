import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="container nav-content">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>CinemaApp</Link>
        <div className="nav-links">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Фильмы</Link>
          <Link className={`nav-link ${location.pathname === '/cinemas' ? 'active' : ''}`} to="/cinemas">Кинотеатры</Link>
          {user && <Link className={`nav-link ${location.pathname === '/my-tickets' ? 'active' : ''}`} to="/my-tickets">Мои билеты</Link>}
          
          {user ? (
            <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Выход ({user.username})</button>
          ) : (
            <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Вход</Link>
          )}
        </div>
      </div>
    </nav>
  );
};