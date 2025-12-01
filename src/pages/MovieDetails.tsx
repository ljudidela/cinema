import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { format } from 'date-fns';

export const MovieDetails = () => {
  const { id } = useParams();
  const { data: movies } = useQuery({ queryKey: ['movies'], queryFn: api.getMovies });
  const { data: sessions } = useQuery({ queryKey: ['movieSessions', id], queryFn: () => api.getMovieSessions(id!) });
  const { data: cinemas } = useQuery({ queryKey: ['cinemas'], queryFn: api.getCinemas });

  const movie = movies?.find(m => m.id === id);

  if (!movie) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', gap: '30px', margin: '30px 0' }}>
        <img src={movie.poster} alt={movie.title} style={{ width: '200px', borderRadius: '8px' }} />
        <div>
          <h1>{movie.title}</h1>
          <p style={{ marginTop: '10px', color: '#ccc' }}>{movie.description}</p>
          <p style={{ marginTop: '10px' }}><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Duration:</strong> {movie.duration} min</p>
        </div>
      </div>

      <h2>Сеансы</h2>
      <div style={{ marginTop: '20px' }}>
        {sessions?.map(session => {
          const cinema = cinemas?.find(c => c.id === session.cinemaId);
          return (
            <div key={session.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h3>{cinema?.name}</h3>
                <p>{format(new Date(session.date), 'dd MMM yyyy, HH:mm')}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${session.price}</span>
                <Link to={`/booking/${session.id}`} className="btn">Выбрать места</Link>
              </div>
            </div>
          );
        })}
        {sessions?.length === 0 && <p>Нет доступных сеансов.</p>}
      </div>
    </div>
  );
};