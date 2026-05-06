import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const movieId = movie.id || movie._id;

  const imgSrc = movie.image && movie.image.startsWith("http")
    ? movie.image
    : `https://placehold.co/400x600/1c2030/e6e9f2?text=${encodeURIComponent(movie.title)}`;

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/400x600/1c2030/e6e9f2?text=${encodeURIComponent(movie.title)}`;
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movieId}`)}>
      <div className="movie-poster">
        {movie.rating && (
          <span className="rating-badge">★ {movie.rating}</span>
        )}
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
