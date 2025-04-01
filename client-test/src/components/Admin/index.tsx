import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../Home';
import LogoutPage from '../Logout';
import { Sidebar } from '@/components/Admin/sidebar.tsx';
import UserDashboard from '@/components/Admin/Users.tsx';
import Challenges from '../Challenges/index.tsx';
import Leaderboard from '../leaderboard/index.tsx';
import Admin from './addChallenges.tsx';

function AdminApp() {
  return (
    <Router>
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
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path='/users' element={<UserDashboard/>}/>
            <Route path='/challenges' element={<Challenges/>}/>
            <Route path='/addchallenge' element={<Admin/>}/>
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminApp;
