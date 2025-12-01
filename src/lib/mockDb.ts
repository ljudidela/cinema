import { Movie, Cinema, Session, User, Booking } from '../types';

export const mockDb = {
  users: [
    { id: '1', username: 'demo', email: 'demo@example.com' }
  ] as User[],
  movies: [
    {
      id: '1',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      posterUrl: 'https://placehold.co/300x450',
      genre: 'Sci-Fi',
      durationMinutes: 148
    },
    {
      id: '2',
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...',
      posterUrl: 'https://placehold.co/300x450',
      genre: 'Action',
      durationMinutes: 152
    }
  ] as Movie[],
  cinemas: [
    { id: '1', name: 'Grand Cinema', location: 'Downtown' },
    { id: '2', name: 'Mall Plex', location: 'North Mall' }
  ] as Cinema[],
  sessions: [
    { id: '101', movieId: '1', cinemaId: '1', startTime: new Date(Date.now() + 86400000).toISOString(), price: 15, seatsAvailable: 50 },
    { id: '102', movieId: '1', cinemaId: '2', startTime: new Date(Date.now() + 90000000).toISOString(), price: 12, seatsAvailable: 30 }
  ] as Session[],
  bookings: [] as Booking[]
};