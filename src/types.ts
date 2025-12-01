export interface User {
  id: string;
  username: string;
  email?: string;
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

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  durationMinutes: number;
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
  startTime: string;
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

export interface BookingWithDetails extends Booking {
  session: Session;
  movie: Movie;
  cinema: Cinema;
}