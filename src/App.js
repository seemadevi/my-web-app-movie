import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import LatestMovies from "./pages/LatestMovies";
import MovieDetails from "./pages/MovieDetails";
import BookingPage from "./pages/BookingPage";
import FinalTicketPage from "./pages/FinalTicketPage";
import UpcomingMovies from "./pages/UpcomingMovies";
import Events from "./pages/Events";

function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-dot"></span>
            CineBook
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
            <NavLink to="/latest" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Latest Movies</NavLink>
            <NavLink to="/upcoming" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Upcoming</NavLink>
            <NavLink to="/events" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Events</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<LatestMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/ticket" element={<FinalTicketPage />} />
      </Routes>
    </div>
  );
}

export default App;
