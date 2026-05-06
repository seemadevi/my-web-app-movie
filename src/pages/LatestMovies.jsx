import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestMovies } from "../redux/movieSlice";
import MovieCard from "../components/MovieCard";

function LatestMovies() {
  const dispatch = useDispatch();
  const { latestMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchLatestMovies());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="section-title">Latest Movies</h1>
      <p className="section-sub">Now playing in theatres — pick your show</p>

      {loading && (
        <div className="state">
          <div className="spinner"></div>
          Loading movies...
        </div>
      )}
      {error && <div className="error-box">Error: {error}</div>}

      <div className="grid">
        {latestMovies?.map((movie) => (
          <MovieCard key={movie.id || movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default LatestMovies;
