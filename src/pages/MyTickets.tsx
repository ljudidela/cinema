import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Booking, Movie, Cinema } from '../types';

interface BookingWithDetails extends Booking {
  movie?: Movie;
  cinema?: Cinema;
}

export default function MyTickets() {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-tickets', user?.id],
    queryFn: () => api.getUserBookings(user!.id),
    enabled: !!user,
  });

  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: api.getMovies,
  });

  const { data: cinemas } = useQuery({
    queryKey: ['cinemas'],
    queryFn: api.getCinemas,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading tickets...</div>;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
        <p className="text-gray-600">You haven't booked any tickets yet.</p>
      </div>
    );
  }

  const enrichedBookings: BookingWithDetails[] = bookings.map(booking => ({
    ...booking,
    movie: movies?.find(m => m.id === booking.movieId),
    cinema: cinemas?.find(c => c.id === booking.cinemaId)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrichedBookings.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{ticket.movie?.title || 'Unknown Movie'}</h3>
              <p className="text-gray-600 mb-4">{ticket.cinema?.name || 'Unknown Cinema'}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{new Date(ticket.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{ticket.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seats:</span>
                  <span className="font-medium">{ticket.seats.join(', ')}</span>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="text-gray-500">Total Price:</span>
                  <span className="font-bold text-indigo-600">${ticket.totalPrice}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 flex justify-between items-center">
              <span>ID: {ticket.id}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full capitalize">{ticket.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
