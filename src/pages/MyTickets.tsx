import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Booking, Movie, Session, Cinema, BookingWithDetails } from '../types';
import { format } from 'date-fns';

export default function MyTickets() {
  const { data: bookings } = useQuery({ queryKey: ['my-bookings'], queryFn: api.bookings.getMyBookings });
  const { data: movies } = useQuery({ queryKey: ['movies'], queryFn: api.movies.getAll });
  const { data: sessions } = useQuery({ queryKey: ['all-sessions'], queryFn: api.sessions.getAll });
  const { data: cinemas } = useQuery({ queryKey: ['cinemas'], queryFn: api.cinemas.getAll });

  if (!bookings || !movies || !sessions || !cinemas) return <div className="p-8">Loading...</div>;

  const enrichedBookings: BookingWithDetails[] = bookings.map((booking: Booking) => {
    const session = sessions.find((s: Session) => s.id === booking.sessionId);
    const movie = session ? movies.find((m: Movie) => m.id === session.movieId) : undefined;
    const cinema = session ? cinemas.find((c: Cinema) => c.id === session.cinemaId) : undefined;

    return {
      ...booking,
      movieTitle: movie?.title || 'Unknown Movie',
      posterUrl: movie?.posterUrl || '',
      cinemaName: cinema?.name || 'Unknown Cinema',
      date: session ? format(new Date(session.date), 'PP') : '',
      time: session ? format(new Date(session.date), 'p') : '',
      price: session?.price || 0
    };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <div className="space-y-4">
        {enrichedBookings.map((ticket) => (
          <div key={ticket.id} className="bg-white border rounded-lg p-4 flex gap-4 shadow-sm">
            <img src={ticket.posterUrl} alt={ticket.movieTitle} className="w-24 h-36 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{ticket.movieTitle}</h2>
              <p className="text-gray-600 mb-1">{ticket.cinemaName}</p>
              <div className="flex gap-4 text-sm mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{ticket.date}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{ticket.time}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-semibold">{ticket.seats} seat(s)</p>
                  <p className="text-sm text-gray-500">ID: {ticket.id}</p>
                </div>
                <p className="text-xl font-bold">${ticket.price * ticket.seats}</p>
              </div>
            </div>
          </div>
        ))}
        {enrichedBookings.length === 0 && <p>No tickets found.</p>}
      </div>
    </div>
  );
}