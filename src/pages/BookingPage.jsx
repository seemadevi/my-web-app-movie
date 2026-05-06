import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    username: "",
    date: "",
    timing: "",
    seats: "",
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/ticket", {
      state: { ...bookingData, movieId: id },
    });
  };

  return (
    <div className="container">
      <h1 className="section-title" style={{ textAlign: "center" }}>Book Your Ticket</h1>
      <p className="section-sub" style={{ textAlign: "center" }}>Fill in your details to confirm your seats</p>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            value={bookingData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Show Date</label>
          <input
            type="date"
            name="date"
            value={bookingData.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Show Timing</label>
          <select
            name="timing"
            value={bookingData.timing}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Show Timing</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Number of Seats</label>
          <input
            type="number"
            name="seats"
            placeholder="2"
            value={bookingData.seats}
            onChange={handleChange}
            required
            min="1"
            className="form-input"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Confirm Booking →
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
