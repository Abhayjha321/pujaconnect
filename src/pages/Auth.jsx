import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

function AuthCard({ title, subtitle, children }) {
return (
<div className="auth-wrap">
    <div className="auth-card">
    <h2>{title}</h2>
    <p className="muted">{subtitle}</p>
    {children}
    </div>
</div>
)
}

export function Login() {
const { login } = useApp()
const navigate = useNavigate()
const location = useLocation()
const [form, setForm] = useState({ email: '', password: '' })
const [error, setError] = useState('')

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

const handleSubmit = (e) => {
e.preventDefault()
if (!form.email.trim() || !form.password) {
    setError('Please fill in all fields.')
    return
}
const result = login(form.email.trim().toLowerCase(), form.password)
if (!result.ok) {
    setError(result.message)
    return
}
navigate(location.state?.from || '/', { replace: true })
}

return (
<AuthCard title="Welcome back" subtitle="Login to book your pandit">
    <form onSubmit={handleSubmit} className="auth-form">
    {error && <div className="alert">{error}</div>}
    <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
    </label>
    <label>
        Password
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Your password" />
    </label>
    <button type="submit" className="btn btn-primary full">Login</button>
    </form>
    <p className="switch">
    New here? <Link to="/register">Create an account</Link>
    </p>
</AuthCard>
)
}

export function Register() {
const { register } = useApp()
const navigate = useNavigate()
const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
const [error, setError] = useState('')

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

const handleSubmit = (e) => {
e.preventDefault()
if (!form.name.trim() || !form.email.trim() || !form.password) {
    setError('Please fill in all fields.')
    return
}
if (form.password.length < 6) {
    setError('Password must be at least 6 characters.')
    return
}
if (form.password !== form.confirm) {
    setError('Passwords do not match.')
    return
}
const result = register(form.name.trim(), form.email.trim().toLowerCase(), form.password)
if (!result.ok) {
    setError(result.message)
    return
}
navigate('/', { replace: true })
}

return (
<AuthCard title="Create your account" subtitle="Join PujaConnect in less than a minute">
    <form onSubmit={handleSubmit} className="auth-form">
    {error && <div className="alert">{error}</div>}
    <label>
        Full name
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
    </label>
    <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
    </label>
    <label>
        Password
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
    </label>
    <label>
        Confirm password
        <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Re-enter password" />
    </label>
    <button type="submit" className="btn btn-primary full">Register</button>
    </form>
    <p className="switch">
    Already have an account? <Link to="/login">Login</Link>
    </p>
</AuthCard>
)
}