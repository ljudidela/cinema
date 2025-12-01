import { LoginCredentials, RegisterData, User, Movie, Cinema, Session, Booking } from '../types';
import { mockDb } from './mockDb';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
      await delay(500);
      const user = mockDb.users.find(u => u.username === credentials.username);
      if (!user) throw new Error('Invalid credentials');
      return { user, token: 'mock-token' };
    },
    register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
      await delay(500);
      const newUser: User = { id: Math.random().toString(), username: data.username, email: data.email || '' };
      mockDb.users.push(newUser);
      return { user: newUser, token: 'mock-token' };
    },
    me: async (): Promise<User> => {
      await delay(300);
      return mockDb.users[0];
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
    },
    getSessions: async (movieId: string): Promise<Session[]> => {
      await delay(400);
      return mockDb.sessions.filter(s => s.movieId === movieId);
    }
  },
  cinemas: {
    getAll: async (): Promise<Cinema[]> => {
      await delay(400);
      return mockDb.cinemas;
    }
  },
  sessions: {
    getAll: async (): Promise<Session[]> => {
        await delay(400);
        return mockDb.sessions;
    }
  },
  bookings: {
    create: async ({sessionId, seats}: {sessionId: string, seats: number}): Promise<Booking> => {
      await delay(600);
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
    getMyBookings: async (): Promise<Booking[]> => {
      await delay(500);
      return mockDb.bookings.filter(b => b.userId === '1');
    }
  }
};