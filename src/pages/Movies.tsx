import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Movie } from '../types';

export default function Movies() {
  const { data: movies, isLoading } = useQuery<Movie[]>({ 
    queryKey: ['movies'], 
    queryFn: api.movies.getAll 
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies?.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className="block group">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">{movie.title}</h2>
                <p className="text-gray-600">{movie.genre} • {movie.durationMinutes} min</p>
              </div>
            </div>
          </Link>
        )) || <p>No movies found</p>}
      </div>
    </div>
  );
}