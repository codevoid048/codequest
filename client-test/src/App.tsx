//App components
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
import AdminLogin from './components/Admin/adminlogin.tsx'
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Potd />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/profile/form" element={<UserDashboard />} /> */}
          <Route path="/profile/edit-profile" element={<EditProfile />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/add-challenge" element={<AddChallenge />} />
          <Route path="/admin/users" element={<UserDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
