import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { format } from 'date-fns';

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movie, isLoading: loadingMovie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => api.movies.getById(id!),
    enabled: !!id,
  });

  const { data: sessions, isLoading: loadingSessions } = useQuery({
    queryKey: ['sessions', id],
    queryFn: () => api.sessions.getByMovie(id!),
    enabled: !!id,
  });

  const { data: cinemas } = useQuery({
    queryKey: ['cinemas'],
    queryFn: api.cinemas.getAll,
  });

  if (loadingMovie || loadingSessions) return <div className="text-white p-8">Loading...</div>;
  if (!movie) return <div className="text-white p-8">Movie not found</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex gap-4 mb-6 text-gray-300">
            <span className="bg-gray-800 px-3 py-1 rounded">{movie.genre}</span>
            <span className="bg-gray-800 px-3 py-1 rounded">{movie.duration} min</span>
            <span className="bg-yellow-600 px-3 py-1 rounded text-white">{movie.rating} ★</span>
          </div>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {movie.description}
          </p>

          <h2 className="text-2xl font-bold mb-4">Available Sessions</h2>
          <div className="space-y-4">
            {sessions?.length === 0 ? (
              <p className="text-gray-400">No sessions available</p>
            ) : (
              sessions?.map((session) => {
                const cinema = cinemas?.find(c => c.id === session.cinemaId);
                return (
                  <div key={session.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{cinema?.name || 'Unknown Cinema'}</h3>
                      <p className="text-gray-400">{format(new Date(session.date), 'MMMM d, yyyy')} at {session.time}</p>
                    </div>
                    <Link 
                      to={`/booking/${session.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold transition-colors"
                    >
                      Book Ticket (${session.price})
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
