import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { Session, Cinema, Movie } from '../types';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: movie } = useQuery<Movie | undefined>({
    queryKey: ['movie', id],
    queryFn: () => api.movies.getById(id!)
  });

  const { data: sessions } = useQuery<Session[]>({
    queryKey: ['sessions', id],
    queryFn: () => api.movies.getSessions(id!)
  });

  const { data: cinemas } = useQuery<Cinema[]>({
    queryKey: ['cinemas'],
    queryFn: api.cinemas.getAll
  });

  const bookMutation = useMutation({
    mutationFn: (sessionId: string) => api.bookings.create(sessionId, 1),
    onSuccess: () => {
      alert('Booking confirmed!');
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
    }
  });

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={movie.posterUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.description}</p>
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">{movie.genre}</span>
            <span className="text-gray-500">{movie.durationMinutes} min</span>
          </div>

          <h2 className="text-2xl font-bold mb-4">Sessions</h2>
          <div className="grid gap-4">
            {sessions?.map((session) => {
              const cinema = cinemas?.find((c) => c.id === session.cinemaId);
              return (
                <div key={session.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">{cinema?.name || 'Unknown Cinema'}</p>
                    <p className="text-sm text-gray-600">{format(new Date(session.startTime), 'PPp')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">${session.price}</span>
                    <button
                      onClick={() => bookMutation.mutate(session.id)}
                      disabled={bookMutation.isPending}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}