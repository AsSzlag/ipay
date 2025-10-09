import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Applications from './pages/Applications';
import NewApplication from './pages/NewApplication';
import Loyalty from './pages/Loyalty';
import Referrals from './pages/Referrals';
import Share from './pages/Share';
import Insurance from './pages/Insurance';
import Settings from './pages/Settings';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes - No Sidebar */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Private Routes - With Sidebar */}
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Applications />} />
            <Route path="applications" element={<Applications />} />
            <Route path="new-application" element={<NewApplication />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="share" element={<Share />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
          </Route>

          {/* Legacy routes for backward compatibility */}
          <Route path="/applications" element={<MainLayout />}>
            <Route index element={<Applications />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PublicLayout />}>
            <Route index element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeContextProvider>
  );
}

export default App;
