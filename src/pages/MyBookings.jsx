import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function MyBookings() {
const { myBookings, cancelBooking } = useApp()
const location = useLocation()

if (myBookings.length === 0) {
return (
    <div className="empty">
    <h2>No bookings yet</h2>
    <p>Find a pandit and book your first puja.</p>
    <Link to="/" className="btn btn-primary">Find Pandits</Link>
    </div>
)
}

return (
<>
    <h2 className="page-title">My Bookings</h2>
    {location.state?.success && (
    <div className="success">Your booking request was sent. The pandit will confirm soon.</div>
    )}
    <div className="booking-list">
    {[...myBookings].reverse().map((b) => (
        <div className="booking" key={b.id}>
        <div>
            <h3>{b.ritual}</h3>
            <p className="muted">with {b.panditName}</p>
            <p>📅 {b.date} · 🕒 {b.time} · {b.locationType}</p>
            <p className="muted">📍 {b.address}</p>
        </div>
        <div className="booking-side">
            <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span>
            <span className="price">₹{b.price}</span>
            {b.status !== 'Cancelled' && (
            <button className="btn btn-danger" onClick={() => cancelBooking(b.id)}>
                Cancel
            </button>
            )}
        </div>
        </div>
    ))}
    </div>
</>
)
}