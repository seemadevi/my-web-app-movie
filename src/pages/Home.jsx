import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Book your next movie experience in seconds.</h1>
        <p>Browse the latest releases, explore upcoming blockbusters, and grab tickets for live events — all in one place.</p>
        <div className="hero-actions">
          <Link to="/latest" className="btn btn-primary">Browse Latest Movies</Link>
          <Link to="/upcoming" className="btn btn-ghost">See What's Coming</Link>
        </div>
      </section>

      <div className="grid-events">
        <div className="event-card">
          <span className="event-tag">Curated</span>
          <h3 className="event-title">Latest Movies</h3>
          <p className="event-desc">Now showing in theatres near you. Pick a seat type that suits you.</p>
          <Link to="/latest" className="btn btn-ghost btn-block">Explore</Link>
        </div>
        <div className="event-card">
          <span className="event-tag">Coming Soon</span>
          <h3 className="event-title">Upcoming Releases</h3>
          <p className="event-desc">Stay ahead — preview what hits the screens next.</p>
          <Link to="/upcoming" className="btn btn-ghost btn-block">Preview</Link>
        </div>
        <div className="event-card">
          <span className="event-tag">Live</span>
          <h3 className="event-title">Events Near You</h3>
          <p className="event-desc">Concerts, plays, and shows happening this month.</p>
          <Link to="/events" className="btn btn-ghost btn-block">Discover</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
