import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/movieSlice";

function Events() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="section-title">Events</h1>
      <p className="section-sub">Live shows, concerts, and performances</p>

      {loading && (
        <div className="state">
          <div className="spinner"></div>
          Loading events...
        </div>
      )}
      {error && <div className="error-box">Error: {error}</div>}

      <div className="grid-events">
        {events?.map((event, index) => (
          <div key={event.id || index} className="event-card">
            {event.image && (
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
            )}
            <span className="event-tag">Event</span>
            <h3 className="event-title">{event.title || event.name || "Event"}</h3>
            <p className="event-desc">{event.description || "No description available"}</p>
            <div className="event-meta">
              <span>📅 {event.date || "TBA"}</span>
              {event.location && <span>📍 {event.location}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
