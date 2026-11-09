import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Navbar() {
const { user, logout } = useApp()
const navigate = useNavigate()

const handleLogout = () => {
logout()
navigate('/login')
}

return (
<header className="navbar">
    <Link to="/" className="brand">🪔 PujaConnect</Link>
    <nav>
    <NavLink to="/">Find Pandits</NavLink>
    {user && <NavLink to="/bookings">My Bookings</NavLink>}
    {user ? (
        <>
        <span className="hello">Hi, {user.name.split(' ')[0]}</span>
        <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </>
    ) : (
        <>
        <NavLink to="/login">Login</NavLink>
        <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </>
    )}
    </nav>
</header>
)
}