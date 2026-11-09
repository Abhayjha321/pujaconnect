import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Booking from './pages/Booking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import { Login, Register } from './pages/Auth.jsx'
import { useApp } from './context/AppContext.jsx'

function Protected({ children }) {
const { user } = useApp()
const location = useLocation()
if (!user) {
return <Navigate to="/login" state={{ from: location.pathname }} replace />
}
return children
}

export default function App() {
return (
<>
    <Navbar />
    <main className="container">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<Protected><Booking /></Protected>} />
        <Route path="/bookings" element={<Protected><MyBookings /></Protected>} />
        <Route path="*" element={<div className="empty"><h2>Page not found</h2></div>} />
    </Routes>
    </main>
    <footer className="footer">© 2026 PujaConnect · College Project</footer>
</>
)
}