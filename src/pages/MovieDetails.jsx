import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../redux/movieSlice";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieDetails, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (loading) return (
    <div className="container">
      <div className="state"><div className="spinner"></div>Loading details...</div>
    </div>
  );
  if (error) return (
    <div className="container"><div className="error-box">Error: {error}</div></div>
  );
  if (!movieDetails) return (
    <div className="container"><div className="state">No movie details found.</div></div>
  );

  const prices = movieDetails.prices;

  return (
    <div className="container">
      <div className="detail-wrap">
        <div className="detail-poster">
          <img
            src={movieDetails.image && movieDetails.image.startsWith("http")
              ? movieDetails.image
              : `https://placehold.co/400x600/1c2030/e6e9f2?text=${encodeURIComponent(movieDetails.title)}`}
            alt={movieDetails.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x600/1c2030/e6e9f2?text=${encodeURIComponent(movieDetails.title)}`;
            }}
          />
        </div>

        <div>
          <h1 className="detail-title">{movieDetails.title}</h1>

          <div className="chip-row">
            {movieDetails.genre && <span className="chip">{movieDetails.genre}</span>}
            {movieDetails.language && <span className="chip">{movieDetails.language}</span>}
            {movieDetails.duration && <span className="chip">⏱ {movieDetails.duration}</span>}
            {movieDetails.rating && <span className="chip">★ {movieDetails.rating}</span>}
          </div>

          {movieDetails.plot && <p className="plot">{movieDetails.plot}</p>}

          <p className="detail-row"><strong>Director</strong> {movieDetails.director}</p>
          <p className="detail-row"><strong>Stars</strong> {movieDetails.stars}</p>
          <p className="detail-row"><strong>Released</strong> {movieDetails.releasedDate}</p>

          {prices && (
            <>
              <h3 style={{ marginTop: 24, marginBottom: 4, fontSize: 16 }}>Ticket Pricing</h3>
              <div className="price-grid">
                <div className="price-card">
                  <div className="lbl">Normal</div>
                  <div className="val">{movieDetails.currency || ""} {prices.normal}</div>
                </div>
                <div className="price-card">
                  <div className="lbl">Superior</div>
                  <div className="val">{movieDetails.currency || ""} {prices.superior}</div>
                </div>
                <div className="price-card">
                  <div className="lbl">Sofa</div>
                  <div className="val">{movieDetails.currency || ""} {prices.sofa}</div>
                </div>
              </div>
            </>
          )}

          <button className="btn btn-primary" onClick={() => navigate(`/book/${id}`)}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
