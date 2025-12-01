import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Seat } from '../types';

export const BookingPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const { data: session, isLoading } = useQuery({
    queryKey: ['session', id],
    queryFn: () => api.getSession(id!)
  });

  const bookMutation = useMutation({
    mutationFn: api.bookSeats,
    onSuccess: () => navigate('/my-tickets')
  });

  if (isLoading || !session) return <div className="container">Loading...</div>;

  const isOccupied = (r: number, c: number) => 
    session.bookedSeats.some(s => s.row === r && s.col === c);

  const isSelected = (r: number, c: number) => 
    selectedSeats.some(s => s.row === r && s.col === c);

  const toggleSeat = (r: number, c: number) => {
    if (!user) return;
    if (isOccupied(r, c)) return;
    
    if (isSelected(r, c)) {
      setSelectedSeats(prev => prev.filter(s => !(s.row === r && s.col === c)));
    } else {
      setSelectedSeats(prev => [...prev, { row: r, col: c }]);
    }
  };

  const handleBook = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    bookMutation.mutate({ 
      sessionId: session.id, 
      seats: selectedSeats, 
      userId: user.id 
    });
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Бронирование мест</h1>
      <p style={{ marginBottom: '20px', color: '#888' }}>Выберите свободные места</p>

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="screen">ЭКРАН</div>
        {Array.from({ length: session.seats.rows }).map((_, r) => (
          <div key={r} className="seat-row">
            {Array.from({ length: session.seats.cols }).map((_, c) => (
              <div
                key={`${r}-${c}`}
                className={`seat ${isOccupied(r + 1, c + 1) ? 'occupied' : ''} ${isSelected(r + 1, c + 1) ? 'selected' : ''}`}
                onClick={() => toggleSeat(r + 1, c + 1)}
                title={`Row ${r + 1}, Seat ${c + 1}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        {!user && <p style={{ color: 'var(--primary)', marginBottom: '10px' }}>Войдите, чтобы выбрать места</p>}
        <button 
          className="btn" 
          disabled={selectedSeats.length === 0 || bookMutation.isPending} 
          onClick={handleBook}
        >
          {user ? (bookMutation.isPending ? 'Бронирование...' : `Забронировать (${selectedSeats.length})`) : 'Войти для бронирования'}
        </button>
      </div>
    </div>
  );
};