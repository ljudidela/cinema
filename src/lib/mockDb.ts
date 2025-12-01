import { User, Movie, Cinema, Session, Booking } from '../types';

export const mockDb = {
  users: [
    { id: '1', username: 'user1', email: 'user1@example.com' }
  ] as User[],
  movies: [
    { id: '1', title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500', durationMinutes: 148, genres: ['Sci-Fi', 'Action'] },
    { id: '2', title: 'The Dark Knight', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.', posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=500', durationMinutes: 152, genres: ['Action', 'Crime'] },
    { id: '3', title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500', durationMinutes: 169, genres: ['Sci-Fi', 'Drama'] }
  ] as Movie[],
  cinemas: [
    { id: '1', name: 'Grand Cinema', location: 'Downtown' },
    { id: '2', name: 'Mall Cinema', location: 'Shopping Mall' }
  ] as Cinema[],
  sessions: [
    { id: '1', movieId: '1', cinemaId: '1', date: '2024-03-20T18:00:00Z', price: 15, seatsAvailable: 50 },
    { id: '2', movieId: '1', cinemaId: '2', date: '2024-03-20T20:00:00Z', price: 12, seatsAvailable: 30 },
    { id: '3', movieId: '2', cinemaId: '1', date: '2024-03-21T19:00:00Z', price: 14, seatsAvailable: 45 },
    { id: '4', movieId: '3', cinemaId: '2', date: '2024-03-21T21:00:00Z', price: 16, seatsAvailable: 60 }
  ] as Session[],
  bookings: [] as Booking[]
};