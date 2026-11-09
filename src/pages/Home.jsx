import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PANDITS, RITUALS } from '../data.js'

export default function Home() {
const [search, setSearch] = useState('')
const [ritual, setRitual] = useState('All')
const [city, setCity] = useState('All')

const cities = ['All', ...new Set(PANDITS.map((p) => p.city))]

const filtered = PANDITS.filter(
(p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (ritual === 'All' || p.rituals[ritual] !== undefined) &&
    (city === 'All' || p.city === city)
)

return (
<>
    <section className="hero">
    <h1>Book a Verified Pandit for Your Puja</h1>
    <p>Compare pandits, rituals, prices and availability, all in one place.</p>
    <div className="filters">
        <input
        placeholder="Search pandit by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <select value={ritual} onChange={(e) => setRitual(e.target.value)}>
        <option>All</option>
        {RITUALS.map((r) => (
            <option key={r}>{r}</option>
        ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
        {cities.map((c) => (
            <option key={c}>{c}</option>
        ))}
        </select>
    </div>
    </section>

    {filtered.length === 0 ? (
    <p className="empty">No pandits match your filters. Try different options.</p>
    ) : (
    <div className="grid">
        {filtered.map((p) => (
        <div className="card" key={p.id}>
            <div className="avatar">{p.name.replace('Pandit ', '')[0]}</div>
            <h3>{p.name}</h3>
            <p className="muted">📍 {p.city} · {p.experience} years experience</p>
            <p className="muted">🗣 {p.languages.join(', ')}</p>
            <p>{p.bio}</p>
            <div className="tags">
            {Object.keys(p.rituals).map((r) => (
                <span key={r} className="tag">{r}</span>
            ))}
            </div>
            <div className="card-footer">
            <span className="price">from ₹{Math.min(...Object.values(p.rituals))}</span>
            <Link className="btn btn-primary" to={`/book/${p.id}`}>Book Now</Link>
            </div>
        </div>
        ))}
    </div>
    )}
</>
)
}