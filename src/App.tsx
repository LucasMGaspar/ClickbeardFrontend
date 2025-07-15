
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';       
import { AuthProvider } from './contexts/AuthContext';

import Login           from './pages/Login';
import Register        from './pages/Register';
import Dashboard       from './pages/Dashboard';
import NewAppointment  from './pages/Appointments/NewAppointment';
import Admin           from './pages/Admin';
import PrivateRoute    from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
      
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/new"
            element={
              <PrivateRoute>
                <NewAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          pauseOnFocusLoss={false}
          theme="colored"
        />
      </AuthProvider>
    </Router>
  );
}
