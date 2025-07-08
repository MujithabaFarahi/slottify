import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import DashboardPage from './Pages/DashBoard';
import FacilitiesPage from './Pages/FacialitiesPage';
import ReservationsPage from './Pages/ReservationsPage';
import SchedulePage from './Pages/SchedulePage';
import AnalyticsPage from './Pages/AnalyticsPage';
import PaymentsPage from './Pages/PaymentsPage';
import NotificationsPage from './Pages/NotificationsPage';
import MembersPage from './Pages/MembersPage';
import SettingsPage from './Pages/SettingsPage';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/RegisterPage';

function App() {
  // const { userType } = useAuth();
  // const isCandidate = userType === 'CANDIDATE';

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/reservations" element={<ReservationsPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
        {/* Example Protected Route (Uncomment and modify as needed) */}
        {/* {isCandidate && (
              <Route path="/jobs" element={<CandidateViewJobs />} />
            )} */}
        {/* </Route> */}

        {/* TODO: Add 404 or catch-all route if needed */}
      </Routes>
      {/* <ToastContainer /> */}
    </Router>
    // </AuthProvider>
  );
}

export default App;
