// Home Page Component
// Landing page with Three.js animated background and navigation to key features
// Showcases the game library system with a visually appealing hero section

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <Row className="text-center">
        <Col>
          <div
            style={{
              background: 'rgba(15, 12, 41, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '60px 40px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #a78bfa, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
              }}
            >
              Game Library
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: '#94a3b8',
                marginBottom: '40px',
                lineHeight: '1.8',
              }}
            >
              Discover, collect, and manage your favorite games.
              <br />
              Build your ultimate game collection in one place.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate('/games')}
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '12px',
                  fontWeight: '600',
                }}
              >
                Browse Games
              </Button>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline-light"
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '12px 30px',
                    borderRadius: '12px',
                    borderColor: '#6366f1',
                    fontWeight: '600',
                  }}
                >
                  Get Started
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline-light"
                  onClick={() => navigate('/collection')}
                  style={{
                    padding: '12px 30px',
                    borderRadius: '12px',
                    borderColor: '#6366f1',
                    fontWeight: '600',
                  }}
                >
                  My Collection
                </Button>
              )}
            </div>
          </div>

          {/* Feature highlights */}
          <Row className="mt-5 g-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                icon: '🎮',
                title: 'Browse Games',
                desc: 'Explore a vast library of games across all platforms and genres.',
              },
              {
                icon: '📚',
                title: 'Build Collection',
                desc: 'Add your favorite games and manage your personal collection.',
              },
              {
                icon: '🔍',
                title: 'Search & Filter',
                desc: 'Find games quickly by title, genre, or developer.',
              },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <div
                  style={{
                    background: 'rgba(15, 12, 41, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '30px 20px',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    height: '100%',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                    {feature.icon}
                  </div>
                  <h5 style={{ color: '#a78bfa', marginBottom: '10px' }}>
                    {feature.title}
                  </h5>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
