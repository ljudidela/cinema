import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { BookingWithDetails } from '../types';
import { format } from 'date-fns';

const MyTickets: React.FC = () => {
  const { data: tickets, isLoading, error } = useQuery<BookingWithDetails[]>({ 
    queryKey: ['my-tickets'], 
    queryFn: api.bookings.getMyBookings 
  });

  if (isLoading) return <div className="p-8 text-center">Loading tickets...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading tickets</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets?.map((ticket) => (
          <div key={ticket.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <div className="flex h-48">
              <img 
                src={ticket.posterUrl} 
                alt={ticket.movieTitle} 
                className="w-32 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2">{ticket.movieTitle}</h3>
                  <p className="text-gray-400 text-sm">{ticket.cinemaName}</p>
                </div>
                <div>
                  <p className="text-lg font-mono">
                    {format(new Date(ticket.date), 'PPP')}
                  </p>
                  <p className="text-sm text-gray-400">
                    {ticket.time} • {ticket.seats.length} seats
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
              <span className="text-sm font-mono text-gray-300">ID: {ticket.id}</span>
              <span className="font-bold text-green-400">${ticket.totalPrice}</span>
            </div>
          </div>
        ))}
        {tickets?.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
