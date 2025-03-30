//App components
import './App.css'
import { Navbar } from '../../client-test/src/components/Navbar'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
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
import AdminLogin from './components/Admin/adminLogin.tsx'
import { Toaster } from 'react-hot-toast';


import { ReactNode } from 'react';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
const AdminLayout = ({ children }: { children: ReactNode }) => {
// Create a layout component for admin routes without Navbar
// const AdminLayout = ({ children }) => {
  return <>{children}</>;
};


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/challenges" element={<ClientLayout><Potd /></ClientLayout>} />
          <Route path="/login" element={<ClientLayout><LoginPage /></ClientLayout>} />
          <Route path="/about" element={<ClientLayout><AboutPage /></ClientLayout>} />
          <Route path="/register" element={<ClientLayout><RegisterPage/></ClientLayout>} />
          <Route path="/leaderboard" element={<ClientLayout><Leaderboard /></ClientLayout>} />
          <Route path="/logout" element={<ClientLayout><LogoutPage /></ClientLayout>} />
          <Route path="/profile" element={<ClientLayout><ProfilePage /></ClientLayout>} />
          {/* <Route path="/profile/form" element={<UserDashboard />} /> */}
          <Route path="/profile/edit-profile" element={<ClientLayout><EditProfile /></ClientLayout>} />
          <Route path="/reset-password/:token" element={<ClientLayout><ResetPassword/></ClientLayout>} />
          <Route path="/forgot-password" element={<ClientLayout><ForgotPassword /></ClientLayout>} />
          <Route path="/admin/add-challenge" element={<AdminLayout><AddChallenge /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><UserDashboard /></AdminLayout>} />
          <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
