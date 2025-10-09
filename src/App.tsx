import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import { ThemeContextProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Applications = lazy(() => import('./pages/Applications/Applications'));
const NewApplication = lazy(
  () => import('./pages/Applications/NewApplication')
);
const NewCompanyApplication = lazy(
  () => import('./pages/Applications/NewCompanyApplication')
);
const NewInvidualApplication = lazy(
  () => import('./pages/Applications/NewInvidualApplication')
);
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Referrals = lazy(() => import('./pages/Referrals'));
const Share = lazy(() => import('./pages/Share'));
const Insurance = lazy(() => import('./pages/Insurance'));
const Settings = lazy(() => import('./pages/Settings'));
const Help = lazy(() => import('./pages/Help'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Suspense fallback={<PageLoader />}>
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
              <Route
                path="new-individual-application"
                element={<NewInvidualApplication />}
              />
              <Route
                path="new-company-application"
                element={<NewCompanyApplication />}
              />
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
        </Suspense>
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
