import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMovies } from "../redux/movieSlice";
import MovieCard from "../components/MovieCard";

function UpcomingMovies() {
  const dispatch = useDispatch();
  const { upcomingMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="section-title">Upcoming Movies</h1>
      <p className="section-sub">Releasing soon — be the first to know</p>

      {loading && (
        <div className="state">
          <div className="spinner"></div>
          Loading movies...
        </div>
      )}
      {error && <div className="error-box">Error: {error}</div>}

      <div className="grid">
        {upcomingMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingMovies;
