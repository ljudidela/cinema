import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export const Cinemas = () => {
  const { data: cinemas, isLoading } = useQuery({ queryKey: ['cinemas'], queryFn: api.getCinemas });

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ margin: '30px 0' }}>Кинотеатры</h1>
      <div className="grid">
        {cinemas?.map(cinema => (
          <div key={cinema.id} className="card">
            <h3>{cinema.name}</h3>
            <p style={{ color: '#888', marginBottom: '15px' }}>{cinema.address}</p>
            <Link to={`/cinema/${cinema.id}`} className="btn">Просмотреть сеансы</Link>
          </div>
        ))}
      </div>
    </div>
  );
};