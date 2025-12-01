export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  duration: number;
  rating: number;
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  description: string;
}

export interface Session {
  id: string;
  movieId: string;
  cinemaId: string;
  date: string;
  time: string;
  price: number;
  seats: number[][]; // 0: free, 1: taken
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  seats: { row: number; col: number }[];
  totalPrice: number;
  createdAt: string;
}

export interface BookingWithDetails extends Booking {
  movieTitle: string;
  posterUrl: string;
  cinemaName: string;
  date: string;
  time: string;
}
