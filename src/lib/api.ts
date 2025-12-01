import { User, LoginCredentials, RegisterCredentials, Movie, Cinema, Booking, BookingInput } from '../types';
import { db } from './mockDb';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(500);
    const foundUser = db.users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Return user without password to simulate secure response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = foundUser;
    return userWithoutPassword as User;
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    await delay(500);
    const existing = db.users.find(u => u.email === credentials.email);
    if (existing) throw new Error('User already exists');
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: credentials.email,
      name: credentials.name,
      password: credentials.password
    };
    
    db.users.push(newUser);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  async getMovies(): Promise<Movie[]> {
    await delay(500);
    return db.movies;
  },

  async getCinemas(): Promise<Cinema[]> {
    await delay(500);
    return db.cinemas;
  },
  
  async getMovie(id: string): Promise<Movie | undefined> {
    await delay(300);
    return db.movies.find(m => m.id === id);
  },

  async getCinema(id: string): Promise<Cinema | undefined> {
    await delay(300);
    return db.cinemas.find(c => c.id === id);
  },

  async createBooking(booking: BookingInput): Promise<Booking> {
    await delay(800);
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...booking,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    db.bookings.push(newBooking);
    return newBooking;
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    await delay(500);
    return db.bookings.filter(b => b.userId === userId);
  }
};
