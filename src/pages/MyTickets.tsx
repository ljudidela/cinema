import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { BookingWithDetails } from '../types';

const MyTickets = () => {
  const { data: bookings, isLoading, error } = useQuery<BookingWithDetails[]>({ 
    queryKey: ['my-bookings'], 
    queryFn: api.bookings.getMyBookings 
  });

  if (isLoading) return <div className="p-8 text-center text-white">Loading tickets...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading tickets</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">My Tickets</h1>
      
      {bookings?.length === 0 ? (
        <div className="text-gray-400 text-center py-12">
          <p className="text-xl mb-4">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings?.map((booking) => (
            <div key={booking.id} className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-lg">
              <div className="md:w-48 flex-shrink-0">
                <img 
                  src={booking.posterUrl} 
                  alt={booking.movieTitle} 
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white mb-2">{booking.movieTitle}</h2>
                <p className="text-xl text-blue-400 mb-4">{booking.cinemaName}</p>
                
                <div className="grid grid-cols-2 gap-4 text-gray-300 mb-4">
                  <div>
                    <span className="block text-sm text-gray-500">Date</span>
                    <span className="font-semibold">{format(new Date(booking.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Time</span>
                    <span className="font-semibold">{booking.time}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Seats</span>
                    <span className="font-semibold">
                      {booking.seats.map(s => `R${s.row + 1}C${s.col + 1}`).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Total Price</span>
                    <span className="font-semibold">${booking.totalPrice}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-4">
                  Booking ID: {booking.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
