// Register Page Component
// Allows users to create a new account with a unique username and password
// Uses React Hooks for state management and form handling

import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, password);
      navigate('/games');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(30, 27, 75, 0.8)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#e2e8f0',
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(15, 12, 41, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '20px',
        }}
      >
        <Card.Body className="p-5">
          <h2
            className="text-center mb-4"
            style={{
              color: '#a78bfa',
              fontWeight: 'bold',
            }}
          >
            Create Account
          </h2>
          <p className="text-center mb-4" style={{ color: '#64748b' }}>
            Join the game library community
          </p>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#6366f1' }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                style={inputStyle}
              />
              <Form.Text style={{ color: '#475569' }}>
                Must be at least 3 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#6366f1' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={inputStyle}
              />
              <Form.Text style={{ color: '#475569' }}>
                Must be at least 6 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ color: '#6366f1' }}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mb-3"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '600',
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form>

          <p className="text-center mt-3" style={{ color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
