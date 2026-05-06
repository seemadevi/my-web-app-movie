import { useNavigate } from "react-router-dom";
import { makeFallbackPoster } from "../utils/posterFallback";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const movieId = movie.id || movie._id;
  const fallback = makeFallbackPoster(movie.title);

  const imgSrc = movie.image && movie.image.startsWith("http") ? movie.image : fallback;

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movieId}`)}>
      <div className="movie-poster">
        {movie.rating && <span className="rating-badge">★ {movie.rating}</span>}
        <img src={imgSrc} alt={movie.title} onError={handleError} />
      </div>
      <div className="movie-body">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">{movie.genre}</p>
        {movie.duration && <p className="movie-meta">⏱ {movie.duration}</p>}
      </div>
    </div>
  );
}

export default MovieCard;
