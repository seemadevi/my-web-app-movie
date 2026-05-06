import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function FinalTicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingInfo = location.state;

  if (!bookingInfo) {
    return (
      <div className="container">
        <div className="state">
          <h2>No Booking Data Found</h2>
          <button className="btn btn-primary" onClick={() => navigate("/")} style={{ marginTop: 16 }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const qrValue = JSON.stringify(bookingInfo);

  return (
    <div className="container">
      <h1 className="section-title" style={{ textAlign: "center" }}>Your Ticket</h1>
      <p className="section-sub" style={{ textAlign: "center" }}>Show this at the entrance</p>

      <div className="ticket">
        <div className="ticket-left">
          <div className="ticket-header">
            <div className="brand" style={{ fontSize: 18 }}>
              <span className="brand-dot"></span>
              CineBook
            </div>
            <span className="event-tag">Confirmed</span>
          </div>

          <div className="ticket-grid">
            <div>
              <div className="ticket-label">Name</div>
              <div className="ticket-value">{bookingInfo.username}</div>
            </div>
            <div>
              <div className="ticket-label">Movie ID</div>
              <div className="ticket-value">#{bookingInfo.movieId}</div>
            </div>
            <div>
              <div className="ticket-label">Date</div>
              <div className="ticket-value">{bookingInfo.date}</div>
            </div>
            <div>
              <div className="ticket-label">Time</div>
              <div className="ticket-value">{bookingInfo.timing}</div>
            </div>
            <div>
              <div className="ticket-label">Seats</div>
              <div className="ticket-value">{bookingInfo.seats}</div>
            </div>
          </div>
        </div>

        <div className="ticket-right">
          <QRCodeCanvas value={qrValue} size={160} bgColor="#161922" fgColor="#e6e9f2" />
          <div className="ticket-label" style={{ textAlign: "center" }}>Scan at entry</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 28 }}>
        <button className="btn btn-ghost" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default FinalTicketPage;
