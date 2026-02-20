// Collection Page Component
// Displays the user's personal game collection
// Allows removing games and viewing game details

import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import GameCard from '../components/GameCard';
import GameDetailModal from '../components/GameDetailModal';
import GameCard3D from '../three/GameCard3D';
import { getUserCollection, removeFromCollection } from '../services/game.service';
import { useAuth } from '../hooks/useAuth';

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch user's game collection
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await getUserCollection();
        setCollection(data);
      } catch (err) {
        console.error('Failed to fetch collection:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

  // Handle removing a game from collection
  const handleRemove = async (gameId) => {
    try {
      const data = await removeFromCollection(gameId);
      setCollection(data.games);
      setMessage({ text: 'Game removed from your collection', type: 'info' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to remove game',
        type: 'danger',
      });
    }
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle viewing game details
  const handleViewDetails = (game) => {
    setSelectedGame(game);
    setShowDetail(true);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" style={{ color: '#6366f1' }} />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Page Header */}
      <h2 className="mb-2" style={{ color: '#a78bfa', fontWeight: 'bold' }}>
        My Collection
      </h2>
      <p className="mb-4" style={{ color: '#64748b' }}>
        {user?.username}&apos;s game collection — {collection.length} game{collection.length !== 1 ? 's' : ''}
      </p>

      {/* Messages */}
      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      {/* 3D Game Cards Header (Three.js integration) */}
      {collection.length > 0 && (
        <div
          className="mb-4"
          style={{
            background: 'rgba(15, 12, 41, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(99, 102, 241, 0.15)',
          }}
        >
          <h5 className="mb-3" style={{ color: '#818cf8' }}>
            Featured in Your Collection (3D View)
          </h5>
          <Row className="g-3">
            {collection.slice(0, 3).map((game) => (
              <Col key={game._id} md={4}>
                <GameCard3D title={game.title} rating={game.rating} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Collection Grid */}
      <Row className="g-4">
        {collection.map((game) => (
          <Col key={game._id} xs={12} sm={6} md={4} lg={3}>
            <GameCard
              game={game}
              onRemove={handleRemove}
              onViewDetails={handleViewDetails}
              isInCollection={true}
              showActions={true}
            />
          </Col>
        ))}
      </Row>

      {collection.length === 0 && (
        <div
          className="text-center py-5"
          style={{
            background: 'rgba(15, 12, 41, 0.4)',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}
        >
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '10px' }}>
            Your collection is empty.
          </p>
          <p style={{ color: '#475569' }}>
            Browse the game library and add games to your collection!
          </p>
        </div>
      )}

      {/* Game Detail Modal */}
      <GameDetailModal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        game={selectedGame}
      />
    </Container>
  );
};

export default CollectionPage;
