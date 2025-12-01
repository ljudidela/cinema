import { Movie, Cinema, Session, User, Booking } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    posterUrl: '![image](https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg)',
    genre: 'Sci-Fi',
    duration: 166,
    rating: 8.8,
  },
  {
    id: '2',
    title: 'Kung Fu Panda 4',
    description: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior.',
    posterUrl: '![image](https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg)',
    genre: 'Animation',
    duration: 94,
    rating: 7.6,
  },
  {
    id: '3',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    posterUrl: '![image](https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg)',
    genre: 'Biography',
    duration: 180,
    rating: 8.6,
  }
];

export const cinemas: Cinema[] = [
  {
    id: '1',
    name: 'Grand Cinema',
    address: '123 Movie St, City Center',
    description: 'Best IMAX experience in town',
  },
  {
    id: '2',
    name: 'Cozy Theater',
    address: '456 Film Ave, Suburbs',
    description: 'Comfortable recliners and gourmet snacks',
  },
];

export const sessions: Session[] = [
  {
    id: '101',
    movieId: '1',
    cinemaId: '1',
    date: '2024-03-20',
    time: '18:00',
    price: 15,
    seats: Array(8).fill(Array(10).fill(0)),
  },
  {
    id: '102',
    movieId: '1',
    cinemaId: '2',
    date: '2024-03-20',
    time: '20:00',
    price: 12,
    seats: Array(6).fill(Array(8).fill(0)),
  },
  {
    id: '103',
    movieId: '2',
    cinemaId: '1',
    date: '2024-03-21',
    time: '14:00',
    price: 10,
    seats: Array(8).fill(Array(10).fill(0)),
  }
];

export const users: User[] = [
  { id: '1', username: 'demo', email: 'demo@example.com' }
];

export const bookings: Booking[] = [];
