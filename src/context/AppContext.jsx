import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

const readStorage = (key, fallback) => {
const saved = localStorage.getItem(key)
return saved ? JSON.parse(saved) : fallback
}

export function AppProvider({ children }) {
const [users, setUsers] = useState(() => readStorage('pc_users', []))
const [user, setUser] = useState(() => readStorage('pc_user', null))
const [bookings, setBookings] = useState(() => readStorage('pc_bookings', []))

useEffect(() => localStorage.setItem('pc_users', JSON.stringify(users)), [users])
useEffect(() => localStorage.setItem('pc_user', JSON.stringify(user)), [user])
useEffect(() => localStorage.setItem('pc_bookings', JSON.stringify(bookings)), [bookings])

const register = (name, email, password) => {
if (users.some((u) => u.email === email)) {
    return { ok: false, message: 'This email is already registered. Please login.' }
}
const newUser = { id: Date.now(), name, email, password }
setUsers([...users, newUser])
setUser({ id: newUser.id, name, email })
return { ok: true }
}

const login = (email, password) => {
const found = users.find((u) => u.email === email && u.password === password)
if (!found) return { ok: false, message: 'Invalid email or password.' }
setUser({ id: found.id, name: found.name, email: found.email })
return { ok: true }
}

const logout = () => setUser(null)

const isSlotTaken = (panditId, date, time) =>
bookings.some(
    (b) =>
    b.panditId === panditId &&
    b.date === date &&
    b.time === time &&
    b.status !== 'Cancelled'
)

const addBooking = (booking) => {
setBookings([
    ...bookings,
    { ...booking, id: Date.now(), status: 'Pending', userEmail: user.email },
])
}

const cancelBooking = (id) => {
setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)))
}

const myBookings = user ? bookings.filter((b) => b.userEmail === user.email) : []

return (
<AppContext.Provider
    value={{
    user,
    register,
    login,
    logout,
    isSlotTaken,
    addBooking,
    cancelBooking,
    myBookings,
    }}
>
    {children}
</AppContext.Provider>
)
}

export const useApp = () => useContext(AppContext)