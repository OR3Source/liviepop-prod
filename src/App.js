import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Landing from './pages/Landing'
import Game from './pages/Game'
import BonusGame from './pages/BonusGame'
import Footer from './components/Footer'
import HowToPlay from './components/HowToPlay'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import Contact from './pages/BetaChecklist'

function App() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header onOpenHelp={() => setShowHelp(true)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/play/:date" element={<Game />} />
            <Route path="/play/prev/:date" element={<BonusGame />} />
            <Route path="/login" element={<Login />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/beta/checklist" element={<BetaChecklist />} />
          </Routes>
        </main>
        <Footer />
        {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App