import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Cinema } from '../types';

export default function Cinemas() {
  const { data: cinemas, isLoading } = useQuery<Cinema[]>({
    queryKey: ['cinemas'],
    queryFn: api.cinemas.getAll
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cinemas</h1>
      <div className="grid gap-4">
        {cinemas?.map((cinema) => (
          <div key={cinema.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">{cinema.name}</h2>
            <p className="text-gray-600">{cinema.location}</p>
          </div>
        )) || <p>No cinemas found</p>}
      </div>
    </div>
  );
}