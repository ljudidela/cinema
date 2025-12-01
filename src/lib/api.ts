import { LoginCredentials, RegisterData, User, Movie, Cinema, Session, Booking, BookingWithDetails } from '../types';
import { movies, cinemas, sessions, users, bookings } from './mockDb';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
      await delay(500);
      const user = users.find(u => u.username === credentials.username);
      if (!user) throw new Error('Invalid credentials');
      return { user, token: 'fake-jwt-token' };
    },
    register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
      await delay(500);
      const newUser: User = { id: Math.random().toString(), username: data.username, email: `${data.username}@example.com` };
      users.push(newUser);
      return { user: newUser, token: 'fake-jwt-token' };
    },
    me: async (): Promise<User> => {
      await delay(200);
      return users[0]; // Mock current user
    },
  },
  movies: {
    getAll: async (): Promise<Movie[]> => {
      await delay(500);
      return movies;
    },
    getById: async (id: string): Promise<Movie | undefined> => {
      await delay(300);
      return movies.find(m => m.id === id);
    }
  },
  cinemas: {
    getAll: async (): Promise<Cinema[]> => {
      await delay(400);
      return cinemas;
    },
    getById: async (id: string): Promise<Cinema | undefined> => {
      await delay(200);
      return cinemas.find(c => c.id === id);
    }
  },
  sessions: {
    getByMovie: async (movieId: string): Promise<Session[]> => {
      await delay(400);
      return sessions.filter(s => s.movieId === movieId);
    },
    getById: async (id: string): Promise<Session | undefined> => {
      await delay(200);
      return sessions.find(s => s.id === id);
    }
  },
  bookings: {
    create: async (booking: Omit<Booking, 'id' | 'createdAt' | 'userId'>): Promise<Booking> => {
      await delay(600);
      const newBooking: Booking = {
        ...booking,
        id: Math.random().toString(),
        userId: '1',
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      return newBooking;
    },
    getMyBookings: async (): Promise<BookingWithDetails[]> => {
      await delay(500);
      const myBookings = bookings.filter(b => b.userId === '1');
      return myBookings.map(b => {
        const session = sessions.find(s => s.id === b.sessionId);
        const movie = session ? movies.find(m => m.id === session.movieId) : null;
        const cinema = session ? cinemas.find(c => c.id === session.cinemaId) : null;
        
        return {
          ...b,
          movieTitle: movie?.title || 'Unknown Movie',
          posterUrl: movie?.posterUrl || '',
          cinemaName: cinema?.name || 'Unknown Cinema',
          date: session?.date || '',
          time: session?.time || '',
        };
      });
    }
  }
};
