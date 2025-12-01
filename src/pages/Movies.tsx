import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export const Movies = () => {
  const { data: movies, isLoading } = useQuery({ queryKey: ['movies'], queryFn: api.getMovies });

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ margin: '30px 0' }}>Фильмы</h1>
      <div className="grid">
        {movies?.map(movie => (
          <div key={movie.id} className="card">
            <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }} />
            <h3>{movie.title}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>{movie.genre} | {movie.duration} min</p>
            <Link to={`/movie/${movie.id}`} className="btn" style={{ display: 'block', textAlign: 'center' }}>Просмотреть сеансы</Link>
          </div>
        ))}
      </div>
    </div>
  );
};