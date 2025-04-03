import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import LoginPage from './components/Login';
import LogoutPage from './components/Logout';
import RegisterPage from './components/SignUp';
import Leaderboard from './components/Leaderboard';
import AboutPage from './components/About';
import ProfilePage from './components/ProfilePage';
import ResetPassword from './components/ResetPassword.tsx';
import ForgotPassword from './components/ForgotPassword';
import EditProfile from './components/ProfilePage/profileEdit';
import AddChallenge from './components/Admin/addChallenges';
import UserDashboard from './components/Admin/Users';
import Challenges from './components/Challenges';
import { Sidebar } from './components/Admin/sidebar';
import Footer from './components/footer';
import { Navbar } from './components/Navbar';
import AdminHome from './components/Admin/home';

function UserApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

function AdminApp() {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 min-h-screen fixed left-0 top-0 bg-gray-800 text-white hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
        <Sidebar />
      </div>
      <div className="flex-grow md:ml-64 p-4 mt-16 md:mt-0">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/codingclubadmin" element={<AdminHome />} />
          <Route path="/codingclubadmin/users" element={<UserDashboard />} />
          <Route path="/codingclubadmin/challenges" element={<Challenges />} />
          <Route path="/codingclubadmin/addchallenge" element={<AddChallenge />} />
          <Route path="/codingclubadmin/leaderboard" element={<Leaderboard />} />
          <Route path="/codingclubadmin/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  return location.pathname.startsWith('/codingclubadmin') ? <AdminApp /> : <UserApp />;
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}