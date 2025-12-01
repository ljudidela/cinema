export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  durationMinutes: number;
  genres: string[];
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
}

export interface Session {
  id: string;
  movieId: string;
  cinemaId: string;
  date: string;
  price: number;
  seatsAvailable: number;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  seats: number;
  status: 'confirmed' | 'cancelled';
}

export interface BookingWithDetails {
  id: string;
  movieTitle: string;
  posterUrl: string;
  cinemaName: string;
  date: string;
  time: string;
  seats: number;
  price: number;
}

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface RegisterData {
  username: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}