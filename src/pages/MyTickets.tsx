import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { BookingWithDetails } from '../types';

export default function MyTickets() {
  const { data: bookings, isLoading } = useQuery<BookingWithDetails[]>({
    queryKey: ['my-bookings'],
    queryFn: api.bookings.getMyBookings
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <div className="grid gap-4">
        {bookings?.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 flex gap-4 shadow-sm">
            <img src={booking.movie.posterUrl} alt={booking.movie.title} className="w-24 h-36 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{booking.movie.title}</h2>
              <p className="text-gray-600">{booking.cinema.name}</p>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{format(new Date(booking.session.startTime), 'PP')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{format(new Date(booking.session.startTime), 'p')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-medium">{booking.seats}</p>
                </div>
              </div>
            </div>
          </div>
        )) || <p>No tickets found</p>}
      </div>
    </div>
  );
}