// Main App Component
// Sets up routing, authentication context, and layout structure
// Integrates Three.js animated background for enhanced UI

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import NavBar from './components/NavBar';
import AnimatedBackground from './three/AnimatedBackground';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GamesPage from './pages/GamesPage';
import CollectionPage from './pages/CollectionPage';

// Protected Route component - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#6366f1' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Layout with navigation and background
const AppLayout = () => {
  return (
    <div style={{ minHeight: '100vh', color: '#e2e8f0' }}>
      {/* Three.js Animated Background */}
      <AnimatedBackground />

      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <CollectionPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

// Root App component with providers
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
};

export default App;
