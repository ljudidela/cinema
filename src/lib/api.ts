import { User, LoginCredentials, RegisterData, Movie, Cinema, Booking, BookingWithDetails } from '../types';
import { users, movies, cinemas, bookings } from './mockDb';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    await delay(500);
    const foundUser = users.find((u) => u.email === credentials.email && u.password === credentials.password);
    if (!foundUser) throw new Error('Invalid credentials');
    const { password, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  },

  register: async (data: RegisterData): Promise<User> => {
    await delay(500);
    if (users.some((u) => u.email === data.email)) {
      throw new Error('User already exists');
    }
    const newUser: User = {
      id: String(users.length + 1),
      ...data,
      role: 'user'
    };
    users.push(newUser);
    return newUser;
  },

  getMovies: async (): Promise<Movie[]> => {
    await delay(500);
    return movies;
  },

  getMovie: async (id: string): Promise<Movie | undefined> => {
    await delay(500);
    return movies.find((m) => m.id === id);
  },

  getCinemas: async (): Promise<Cinema[]> => {
    await delay(500);
    return cinemas;
  },

  getBookings: async (userId: string): Promise<BookingWithDetails[]> => {
    await delay(500);
    const userBookings = bookings.filter((b) => b.userId === userId);
    return userBookings.map(b => {
      const movie = movies.find(m => m.id === b.movieId);
      const cinema = cinemas.find(c => c.id === b.cinemaId);
      return {
        ...b,
        movieTitle: movie?.title || 'Unknown Movie',
        cinemaName: cinema?.name || 'Unknown Cinema',
        moviePoster: movie?.poster || ''
      };
    });
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    await delay(500);
    const newBooking: Booking = {
      ...booking,
      id: String(bookings.length + 1),
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    return newBooking;
  }
};