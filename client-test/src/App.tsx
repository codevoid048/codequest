//App component
import './App.css'
import { Navbar } from '../../client-test/src/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Potd from './components/challanges/challange'
import LoginPage from './components/login'
import RegisterPage from './components/register'
import Footer from './components/footer'
import Leaderboard from './components/leaderboard'
function App() {

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Potd />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
          <Footer/>
      </div>
    </Router>
  )
}

export default App
