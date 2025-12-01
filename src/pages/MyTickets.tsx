import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { format, differenceInSeconds } from 'date-fns';
import { BookingWithDetails } from '../types';
import { useNavigate } from 'react-router-dom';

const TicketTimer = ({ bookedAt, timeoutSeconds, onExpire }: { bookedAt: string, timeoutSeconds: number, onExpire: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = differenceInSeconds(new Date(bookedAt).getTime() + timeoutSeconds * 1000, new Date());
      if (diff <= 0) {
        clearInterval(interval);
        onExpire();
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bookedAt, timeoutSeconds, onExpire]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  return <span className="timer">{mins}:{secs < 10 ? `0${secs}` : secs}</span>;
};

export const MyTickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const { data: bookings } = useQuery({
    queryKey: ['myBookings', user?.id],
    queryFn: () => api.getMyBookings(user!.id),
    enabled: !!user,
    refetchInterval: 5000 // Simple polling to remove expired tickets visually if backend deleted them
  });

  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: api.getSettings });

  const payMutation = useMutation({
    mutationFn: api.payBooking,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myBookings'] })
  });

  if (!user || !bookings || !settings) return <div className="container">Loading...</div>;

  const now = new Date();
  
  // Filter and Sort
  const unpaid = bookings.filter(b => b.status === 'unpaid' && 
    differenceInSeconds(new Date(b.bookedAt).getTime() + settings.paymentTimeoutSeconds * 1000, now) > 0
  );
  
  const paid = bookings.filter(b => b.status === 'paid');
  const future = paid.filter(b => new Date(b.session.date) > now);
  const past = paid.filter(b => new Date(b.session.date) <= now);

  return (
    <div className="container">
      <h1 style={{ margin: '30px 0' }}>Мои билеты</h1>

      {unpaid.length > 0 && (
        <div className="ticket-group">
          <h3 style={{ color: 'var(--primary)' }}>Неоплаченные</h3>
          {unpaid.map(b => (
            <div key={b.id} className="ticket-card" style={{ border: '1px solid var(--primary)' }}>
              <div>
                <h4>{b.movie.title}</h4>
                <p>{b.cinema.name} - {format(new Date(b.session.date), 'dd MMM HH:mm')}</p>
                <p>Места: {b.seats.map(s => `${s.row}-${s.col}`).join(', ')}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '10px' }}>
                  Осталось: <TicketTimer 
                    bookedAt={b.bookedAt} 
                    timeoutSeconds={settings.paymentTimeoutSeconds} 
                    onExpire={() => queryClient.invalidateQueries({ queryKey: ['myBookings'] })} 
                  />
                </div>
                <button 
                  className="btn" 
                  onClick={() => payMutation.mutate(b.id)} 
                  disabled={payMutation.isPending}
                >
                  Оплатить ${b.totalPrice}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="ticket-group">
        <h3>Будущие сеансы</h3>
        {future.length === 0 && <p style={{ color: '#888' }}>Нет билетов</p>}
        {future.map(b => (
          <div key={b.id} className="ticket-card">
            <div>
              <h4>{b.movie.title}</h4>
              <p>{b.cinema.name}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p>{format(new Date(b.session.date), 'dd MMM yyyy, HH:mm')}</p>
              <p style={{ color: 'var(--success)' }}>Оплачено</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ticket-group">
        <h3>Прошедшие</h3>
        {past.map(b => (
          <div key={b.id} className="ticket-card" style={{ opacity: 0.6 }}>
             <div>
              <h4>{b.movie.title}</h4>
              <p>{b.cinema.name}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p>{format(new Date(b.session.date), 'dd MMM yyyy, HH:mm')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};