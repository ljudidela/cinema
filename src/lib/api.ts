import { User, Movie, Cinema, MovieSession, Booking, BookingWithDetails } from '../types';
import { MOVIES, CINEMAS, SESSIONS, db } from './mockDb';

const DELAY = 500;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Client
export const api = {
  getSettings: async () => {
    await delay(DELAY);
    return { paymentTimeoutSeconds: 60 }; // 1 minute for testing
  },

  register: async (creds: any): Promise<User> => {
    await delay(DELAY);
    const users = db.users();
    if (users.find(u => u.username === creds.username)) {
      throw new Error('Username already exists');
    }
    const newUser = { id: Math.random().toString(36).substr(2, 9), username: creds.username };
    db.addUser(newUser);
    return newUser;
  },

  login: async (creds: any): Promise<User> => {
    await delay(DELAY);
    const user = db.users().find(u => u.username === creds.username && creds.password === creds.password); // Mock password check
    // In a real app, we check hashed password. Here we assume if user exists, password matches for simplicity OR check exact match if we stored it.
    // Let's rely on simple find. For this task, we can't really validate password hash without storing it.
    // Let's assume registration stores password in localstorage (unsafe but ok for mock).
    
    // RE-IMPLEMENTING DB FOR PASSWORD STORAGE SIMULATION
    const storedUsers = JSON.parse(localStorage.getItem('users_creds') || '[]');
    const found = storedUsers.find((u: any) => u.username === creds.username && u.password === creds.password);
    
    if (!found) {
       throw new Error('Неверный логин или пароль. Проверьте введенные данные и попробуйте снова');
    }
    return { id: found.id, username: found.username };
  },

  registerWithPass: async (creds: any): Promise<User> => {
    await delay(DELAY);
    const storedUsers = JSON.parse(localStorage.getItem('users_creds') || '[]');
    if (storedUsers.find((u: any) => u.username === creds.username)) throw new Error('User exists');
    
    const newUser = { id: Math.random().toString(36).substr(2, 9), username: creds.username, password: creds.password };
    storedUsers.push(newUser);
    localStorage.setItem('users_creds', JSON.stringify(storedUsers));
    
    // Also sync with public db
    db.addUser({ id: newUser.id, username: newUser.username });
    return { id: newUser.id, username: newUser.username };
  },

  getMovies: async (): Promise<Movie[]> => {
    await delay(DELAY);
    return MOVIES;
  },

  getCinemas: async (): Promise<Cinema[]> => {
    await delay(DELAY);
    return CINEMAS;
  },

  getMovieSessions: async (movieId: string): Promise<MovieSession[]> => {
    await delay(DELAY);
    return SESSIONS.filter(s => s.movieId === movieId);
  },
  
  getCinemaSessions: async (cinemaId: string): Promise<MovieSession[]> => {
    await delay(DELAY);
    return SESSIONS.filter(s => s.cinemaId === cinemaId);
  },

  getSession: async (sessionId: string): Promise<MovieSession> => {
    await delay(DELAY);
    const session = SESSIONS.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');
    
    // Merge with realtime bookings from localstorage to show up-to-date seats
    const bookings = db.bookings().filter(b => b.sessionId === sessionId);
    const realtimeBooked = bookings.flatMap(b => b.seats);
    
    return {
      ...session,
      bookedSeats: [...session.bookedSeats, ...realtimeBooked]
    };
  },

  bookSeats: async (data: { sessionId: string, seats: {row: number, col: number}[], userId: string }) => {
    await delay(DELAY);
    const session = SESSIONS.find(s => s.id === data.sessionId);
    if (!session) throw new Error('Session error');
    
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: data.userId,
      sessionId: data.sessionId,
      seats: data.seats,
      status: 'unpaid',
      bookedAt: new Date().toISOString(),
      totalPrice: session.price * data.seats.length
    };
    
    db.addBooking(booking);
    return booking;
  },

  getMyBookings: async (userId: string): Promise<BookingWithDetails[]> => {
    await delay(DELAY);
    const bookings = db.bookings().filter(b => b.userId === userId);
    return bookings.map(b => {
      const session = SESSIONS.find(s => s.id === b.sessionId)!;
      const movie = MOVIES.find(m => m.id === session.movieId)!;
      const cinema = CINEMAS.find(c => c.id === session.cinemaId)!;
      return { ...b, session, movie, cinema };
    });
  },

  payBooking: async (bookingId: string) => {
    await delay(DELAY);
    db.updateBooking(bookingId, { status: 'paid' });
    return true;
  }
};