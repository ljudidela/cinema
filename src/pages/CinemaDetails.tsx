import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { format } from 'date-fns';

export const CinemaDetails = () => {
  const { id } = useParams();
  const { data: cinemas } = useQuery({ queryKey: ['cinemas'], queryFn: api.getCinemas });
  const { data: sessions } = useQuery({ queryKey: ['cinemaSessions', id], queryFn: () => api.getCinemaSessions(id!) });
  const { data: movies } = useQuery({ queryKey: ['movies'], queryFn: api.getMovies });

  const cinema = cinemas?.find(c => c.id === id);

  if (!cinema) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ margin: '30px 0' }}>{cinema.name}</h1>
      <p>{cinema.address}</p>

      <h2 style={{ marginTop: '30px' }}>Ближайшие сеансы</h2>
      <div style={{ marginTop: '20px' }}>
        {sessions?.map(session => {
          const movie = movies?.find(m => m.id === session.movieId);
          return (
            <div key={session.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h3>{movie?.title}</h3>
                <p>{format(new Date(session.date), 'dd MMM yyyy, HH:mm')}</p>
              </div>
              <Link to={`/booking/${session.id}`} className="btn">Выбрать места</Link>
            </div>
          );
        })}
        {sessions?.length === 0 && <p>Нет доступных сеансов.</p>}
      </div>
    </div>
  );
};