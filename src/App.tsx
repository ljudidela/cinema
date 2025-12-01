import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Movies } from './pages/Movies';
import { Cinemas } from './pages/Cinemas';
import { MovieDetails } from './pages/MovieDetails';
import { CinemaDetails } from './pages/CinemaDetails';
import { BookingPage } from './pages/Booking';
import { MyTickets } from './pages/MyTickets';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/cinemas" element={<Cinemas />} />
        <Route path="/cinema/:id" element={<CinemaDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;