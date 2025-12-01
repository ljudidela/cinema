export interface User {
  id: string;
  username: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  genre: string;
  duration: number;
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
}

export interface Seat {
  row: number;
  col: number;
}

export interface MovieSession {
  id: string;
  movieId: string;
  cinemaId: string;
  date: string; // ISO string
  price: number;
  seats: { rows: number; cols: number };
  bookedSeats: Seat[];
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  seats: Seat[];
  status: 'unpaid' | 'paid';
  bookedAt: string; // ISO string
  totalPrice: number;
}

export interface BookingWithDetails extends Booking {
  movie: Movie;
  cinema: Cinema;
  session: MovieSession;
}