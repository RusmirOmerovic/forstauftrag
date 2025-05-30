import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import EingabeFormular from './pages/EingabeFormular'
import Zusammenfassung from './pages/Zusammenfassung'
import Notfallplan from './components/Notfallplan'
import './App.css'

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">📝 Eingabe</Link>
        <Link to="/zusammenfassung">📄 Zusammenfassung</Link>
        <Notfallplan />
      </nav>

      <Routes>
        <Route path="/" element={<EingabeFormular />} />
        <Route path="/zusammenfassung" element={<Zusammenfassung />} />
      </Routes>
    </div>
  )
}

export default App
