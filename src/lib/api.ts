import { User, LoginCredentials, RegisterData, Movie, Cinema, Booking, BookingWithDetails } from '../types';
import { mockDb } from './mockDb';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
      await delay(500);
      const user = mockDb.users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (!user) throw new Error('Invalid credentials');
      const { password, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token: 'mock-jwt-token' };
    },
    register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
      await delay(500);
      const existing = mockDb.users.find(u => u.email === data.email);
      if (existing) throw new Error('User already exists');
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...data
      };
      mockDb.users.push(newUser);
      
      const { password, ...userWithoutPassword } = newUser;
      return { user: userWithoutPassword, token: 'mock-jwt-token' };
    },
    me: async (): Promise<User> => {
      await delay(300);
      const user = mockDb.users[0];
      if (!user) throw new Error('No user found');
      const { password, ...safeUser } = user;
      return safeUser;
    }
  },
  movies: {
    getAll: async (): Promise<Movie[]> => {
      await delay(500);
      return mockDb.movies;
    },
    getOne: async (id: string): Promise<Movie | undefined> => {
      await delay(300);
      return mockDb.movies.find(m => m.id === id);
    }
  },
  cinemas: {
    getAll: async (): Promise<Cinema[]> => {
      await delay(500);
      return mockDb.cinemas;
    },
    getOne: async (id: string): Promise<Cinema | undefined> => {
      await delay(300);
      return mockDb.cinemas.find(c => c.id === id);
    }
  },
  bookings: {
    create: async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
      await delay(800);
      const newBooking = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...booking
      };
      mockDb.bookings.push(newBooking);
      return newBooking;
    },
    getMyBookings: async (): Promise<BookingWithDetails[]> => {
      await delay(600);
      return mockDb.bookings.map(b => {
        const movie = mockDb.movies.find(m => m.id === b.movieId);
        const cinema = mockDb.cinemas.find(c => c.id === b.cinemaId);
        if (!movie || !cinema) return null;
        return {
          ...b,
          movieTitle: movie.title,
          cinemaName: cinema.name,
          posterUrl: movie.posterUrl
        };
      }).filter((b): b is BookingWithDetails => b !== null);
    }
  }
};
