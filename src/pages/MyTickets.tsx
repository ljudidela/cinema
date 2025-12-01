import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { BookingWithDetails } from '../types';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getBookings(user.id)
        .then(setTickets)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="p-8 text-center">Loading tickets...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {ticket.moviePoster && (
                  <img src={ticket.moviePoster} alt={ticket.movieTitle} className="w-20 h-28 object-cover rounded" />
                )}
                <div>
                  <h3 className="font-bold text-lg">{ticket.movieTitle}</h3>
                  <p className="text-gray-600">{ticket.cinemaName}</p>
                  <p className="text-sm mt-2">
                    {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
                  </p>
                  <p className="text-sm mt-1">
                    Seats: <span className="font-medium">{ticket.seats.join(', ')}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Price: ${ticket.totalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}