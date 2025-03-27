//App component
import './App.css'
import { Navbar } from '../../client-test/src/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Potd from './components/Challenges'
import LoginPage from './components/Login'
import RegisterPage from './components/SignUp'
import Footer from './components/footer'
import AboutPage from './components/About'
import Leaderboard from './components/Leaderboard'
function App() {

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Potd />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
          <Footer/>
      </div>
    </Router>
  )
}

export default App
