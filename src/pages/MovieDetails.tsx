import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { format } from 'date-fns';
import { Session, Cinema } from '../types';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: movie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => api.movies.getOne(id!),
    enabled: !!id
  });

  const { data: sessions } = useQuery({
    queryKey: ['sessions', id],
    queryFn: () => api.movies.getSessions(id!),
    enabled: !!id
  });

  const { data: cinemas } = useQuery({
    queryKey: ['cinemas'],
    queryFn: api.cinemas.getAll
  });

  const bookMutation = useMutation({
    mutationFn: (vars: { sessionId: string, seats: number }) => api.bookings.create(vars),
    onSuccess: () => {
      alert('Booking successful!');
    }
  });

  if (!movie) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <img src={movie.posterUrl} alt={movie.title} className="w-full md:w-80 rounded-lg object-cover" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-6 text-lg">{movie.description}</p>
          <div className="mb-6">
            <span className="font-semibold">Duration:</span> {movie.durationMinutes} min
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Available Sessions</h2>
          <div className="space-y-4">
            {sessions?.map((session: Session) => {
              const cinema = cinemas?.find((c: Cinema) => c.id === session.cinemaId);
              return (
                <div key={session.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="font-bold text-lg">{cinema?.name || 'Unknown Cinema'}</div>
                    <div className="text-gray-600">{format(new Date(session.date), 'PPp')}</div>
                    <div className="text-sm text-green-600">{session.seatsAvailable} seats available</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">${session.price}</span>
                    <button 
                      onClick={() => bookMutation.mutate({ sessionId: session.id, seats: 1 })}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              );
            })}
            {sessions?.length === 0 && <p>No sessions available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}