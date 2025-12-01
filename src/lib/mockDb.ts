import { Movie, Cinema, MovieSession, User, Booking } from '../types';

// Initial Data
export const MOVIES: Movie[] = [
  { id: '1', title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', poster: 'https://via.placeholder.com/300x450?text=Inception', genre: 'Sci-Fi', duration: 148 },
  { id: '2', title: 'The Matrix', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.', poster: 'https://via.placeholder.com/300x450?text=Matrix', genre: 'Action', duration: 136 },
  { id: '3', title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', poster: 'https://via.placeholder.com/300x450?text=Interstellar', genre: 'Sci-Fi', duration: 169 },
];

export const CINEMAS: Cinema[] = [
  { id: '1', name: 'Grand Cinema', address: '123 Main St' },
  { id: '2', name: 'Star Plex', address: '456 Star Ave' },
];

// Generate sessions
export const SESSIONS: MovieSession[] = [];
MOVIES.forEach(movie => {
  CINEMAS.forEach(cinema => {
    // Create sessions for today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    [today, tomorrow].forEach((date, dayIdx) => {
      [14, 18, 21].forEach((hour, hourIdx) => {
        const sessionDate = new Date(date);
        sessionDate.setHours(hour, 0, 0, 0);
        SESSIONS.push({
          id: `${movie.id}-${cinema.id}-${dayIdx}-${hourIdx}`,
          movieId: movie.id,
          cinemaId: cinema.id,
          date: sessionDate.toISOString(),
          price: 10 + hourIdx * 2,
          seats: { rows: 6, cols: 8 },
          bookedSeats: [{ row: 1, col: 2 }, { row: 3, col: 4 }] // Random occupied
        });
      });
    });
  });
});

// LocalStorage Helpers
const getStorage = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const db = {
  users: () => getStorage<User[]>('users', []),
  addUser: (user: User) => {
    const users = db.users();
    users.push(user);
    setStorage('users', users);
  },
  bookings: () => getStorage<Booking[]>('bookings', []),
  addBooking: (booking: Booking) => {
    const bookings = db.bookings();
    bookings.push(booking);
    setStorage('bookings', bookings);
    
    // Update session booked seats (Mock logic)
    const session = SESSIONS.find(s => s.id === booking.sessionId);
    if (session) {
      session.bookedSeats.push(...booking.seats);
    }
  },
  updateBooking: (bookingId: string, updates: Partial<Booking>) => {
    const bookings = db.bookings().map(b => b.id === bookingId ? { ...b, ...updates } : b);
    setStorage('bookings', bookings);
  }
};