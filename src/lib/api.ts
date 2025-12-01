import { mockDb } from './mockDb';
import { LoginCredentials, RegisterData, User, Movie, Cinema, Session, Booking, BookingWithDetails } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
      await delay(500);
      const user = mockDb.users.find(u => u.username === credentials.username);
      if (!user) {
        // Mock login success for demo
        return { user: { id: '1', username: credentials.username }, token: 'mock-token' };
      }
      return { user, token: 'mock-token' };
    },
    register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
      await delay(500);
      const newUser = { id: Math.random().toString(), username: data.username, email: data.email };
      mockDb.users.push(newUser);
      return { user: newUser, token: 'mock-token' };
    },
    me: async (): Promise<User> => {
      await delay(200);
      return mockDb.users[0];
    }
  },
  movies: {
    getAll: async (): Promise<Movie[]> => {
      await delay(500);
      return mockDb.movies;
    },
    getById: async (id: string): Promise<Movie | undefined> => {
      await delay(300);
      return mockDb.movies.find(m => m.id === id);
    },
    getSessions: async (movieId: string): Promise<Session[]> => {
      await delay(300);
      return mockDb.sessions.filter(s => s.movieId === movieId);
    }
  },
  cinemas: {
    getAll: async (): Promise<Cinema[]> => {
      await delay(500);
      return mockDb.cinemas;
    },
    getById: async (id: string): Promise<Cinema | undefined> => {
      await delay(300);
      return mockDb.cinemas.find(c => c.id === id);
    }
  },
  bookings: {
    create: async (sessionId: string, seats: number): Promise<Booking> => {
      await delay(500);
      const booking: Booking = {
        id: Math.random().toString(),
        userId: '1',
        sessionId,
        seats,
        status: 'confirmed'
      };
      mockDb.bookings.push(booking);
      return booking;
    },
    getMyBookings: async (): Promise<BookingWithDetails[]> => {
      await delay(500);
      return mockDb.bookings.map(b => {
        const session = mockDb.sessions.find(s => s.id === b.sessionId);
        if (!session) return null;
        const movie = mockDb.movies.find(m => m.id === session.movieId);
        const cinema = mockDb.cinemas.find(c => c.id === session.cinemaId);
        if (!movie || !cinema) return null;
        return { ...b, session, movie, cinema };
      }).filter(Boolean) as BookingWithDetails[];
    }
  }
};