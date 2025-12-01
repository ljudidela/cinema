import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Movie } from '../types';

export default function Movies() {
  const { data: movies, isLoading, error } = useQuery<Movie[]>({ 
    queryKey: ['movies'], 
    queryFn: api.movies.getAll 
  });

  if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading movies</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie: Movie) => (
          <Link 
            to={`/movies/${movie.id}`} 
            key={movie.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}