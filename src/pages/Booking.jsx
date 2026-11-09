    import { useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import { PANDITS, TIME_SLOTS } from '../data.js'
    import { useApp } from '../context/AppContext.jsx'

    export default function Booking() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, addBooking, isSlotTaken } = useApp()
    const pandit = PANDITS.find((p) => p.id === Number(id))

    const [form, setForm] = useState({
    ritual: pandit ? Object.keys(pandit.rituals)[0] : '',
    date: '',
    time: '',
    locationType: 'Home',
    address: '',
    })
    const [error, setError] = useState('')

    if (!pandit) {
    return (
        <div className="empty">
        <h2>Pandit not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to pandits</button>
        </div>
    )
    }

    const today = new Date().toISOString().split('T')[0]
    const price = pandit.rituals[form.ritual]

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.date || !form.time || !form.address.trim()) {
        setError('Please fill in the date, time and address.')
        return
    }
    if (isSlotTaken(pandit.id, form.date, form.time)) {
        setError('This slot is already booked. Please choose another time.')
        return
    }
    addBooking({
        panditId: pandit.id,
        panditName: pandit.name,
        ritual: form.ritual,
        price,
        date: form.date,
        time: form.time,
        locationType: form.locationType,
        address: form.address.trim(),
    })
    navigate('/bookings', { state: { success: true } })
    }

    return (
    <div className="booking-form">
        <h2>Book {pandit.name}</h2>
        <p className="muted">Booking as {user.name} ({user.email})</p>

        <form onSubmit={handleSubmit}>
        {error && <div className="alert">{error}</div>}

        <label>
            Ritual
            <select name="ritual" value={form.ritual} onChange={handleChange}>
            {Object.keys(pandit.rituals).map((r) => (
                <option key={r}>{r}</option>
            ))}
            </select>
        </label>

        <div className="two-col">
            <label>
            Date
            <input type="date" name="date" min={today} value={form.date} onChange={handleChange} />
            </label>
            <label>
            Time
            <select name="time" value={form.time} onChange={handleChange}>
                <option value="">Select time</option>
                {TIME_SLOTS.map((t) => (
                <option key={t}>{t}</option>
                ))}
            </select>
            </label>
        </div>

        <fieldset>
            <legend>Location</legend>
            <div className="radio-row">
            {['Home', 'Temple'].map((type) => (
                <label key={type}>
                <input
                    type="radio"
                    name="locationType"
                    value={type}
                    checked={form.locationType === type}
                    onChange={handleChange}
                />
                {type === 'Home' ? 'Home puja' : 'Temple'}
                </label>
            ))}
            </div>
        </fieldset>

        <label>
            Full address
            <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            placeholder="House/flat no., street, area, city"
            />
        </label>

        <div className="summary">
            {form.ritual} · ₹{price}
        </div>

        <button type="submit" className="btn btn-primary full">Send Booking Request</button>
        </form>
    </div>
    )
    }