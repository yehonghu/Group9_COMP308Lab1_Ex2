// Navigation Bar Component
// Provides navigation links and user authentication status display
// Uses React-Bootstrap for styling

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        background: 'rgba(15, 12, 41, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', color: '#a78bfa' }}>
          🎮 Game Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#e2e8f0' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/games" style={{ color: '#e2e8f0' }}>
              All Games
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/collection" style={{ color: '#e2e8f0' }}>
                My Collection
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3" style={{ color: '#a78bfa' }}>
                  Welcome, <strong>{user?.username}</strong>
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  style={{ borderColor: '#6366f1' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: '#e2e8f0' }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: '#e2e8f0' }}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
