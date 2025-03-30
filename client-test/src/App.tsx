//App component
import './App.css'
import { Navbar } from '../../client-test/src/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Potd from './components/Challenges'
import LoginPage from './components/Login'
import LogoutPage from './components/Logout'
import RegisterPage from './components/SignUp'
import Footer from './components/footer'
import AboutPage from './components/About'
import UserDashboard from './components/Admin/Users.tsx'
import Leaderboard from './components/leaderboard'
import ProfilePage from "./components/ProfilePage"
import ResetPassword from './components/ResetPassword.tsx'
import ForgotPassword from './components/ForgotPassword/index.tsx'
import EditProfile from './components/ProfilePage/profileEdit.tsx'
import AddChallenge from "./components/Admin/addChallenges.tsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Potd />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/form" element={<UserDashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/add-challenge" element={<AddChallenge />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
