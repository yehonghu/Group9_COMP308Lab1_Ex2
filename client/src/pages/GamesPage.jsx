// Games Page Component
// Displays all available games in the library with search and filter functionality
// Allows authenticated users to add games to their collection

import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import GameCard from '../components/GameCard';
import GameDetailModal from '../components/GameDetailModal';
import AddGameForm from '../components/AddGameForm';
import { getAllGames } from '../services/game.service';
import { addToCollection, getUserCollection } from '../services/game.service';
import { useAuth } from '../hooks/useAuth';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [collectionIds, setCollectionIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch all games on mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getAllGames();
        setGames(data);
      } catch (err) {
        console.error('Failed to fetch games:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Fetch user's collection to know which games are already added
  useEffect(() => {
    const fetchCollection = async () => {
      if (isAuthenticated) {
        try {
          const data = await getUserCollection();
          setCollectionIds(data.map((g) => g._id));
        } catch (err) {
          console.error('Failed to fetch collection:', err);
        }
      }
    };
    fetchCollection();
  }, [isAuthenticated]);

  // Filter games based on search query using useMemo for performance
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;
    const query = searchQuery.toLowerCase();
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.developer.toLowerCase().includes(query) ||
        game.platform.toLowerCase().includes(query)
    );
  }, [games, searchQuery]);

  // Handle adding a game to collection
  const handleAddToCollection = async (gameId) => {
    if (!isAuthenticated) {
      setMessage({ text: 'Please login to add games to your collection', type: 'warning' });
      return;
    }
    try {
      const data = await addToCollection(gameId);
      setCollectionIds(data.games.map((g) => g._id));
      setMessage({ text: 'Game added to your collection!', type: 'success' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to add game',
        type: 'danger',
      });
    }
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle viewing game details
  const handleViewDetails = (game) => {
    setSelectedGame(game);
    setShowDetail(true);
  };

  // Handle new game added via form
  const handleGameAdded = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
    setMessage({ text: 'New game added to the library!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
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
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 style={{ color: '#a78bfa', fontWeight: 'bold', margin: 0 }}>
          Game Library
        </h2>
        {isAuthenticated && (
          <Button
            onClick={() => setShowAddForm(true)}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 24px',
              fontWeight: '600',
            }}
          >
            + Add New Game
          </Button>
        )}
      </div>

      {/* Search Bar */}
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
        <Form.Control
          type="text"
          placeholder="Search games by title, genre, developer, or platform..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: 'rgba(30, 27, 75, 0.8)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#e2e8f0',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Messages */}
      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      {/* Results count */}
      <p className="mb-3" style={{ color: '#64748b' }}>
        Showing {filteredGames.length} of {games.length} games
      </p>

      {/* Games Grid */}
      <Row className="g-4">
        {filteredGames.map((game) => (
          <Col key={game._id} xs={12} sm={6} md={4} lg={3}>
            <GameCard
              game={game}
              onAdd={handleAddToCollection}
              onViewDetails={handleViewDetails}
              isInCollection={collectionIds.includes(game._id)}
              showActions={true}
            />
          </Col>
        ))}
      </Row>

      {filteredGames.length === 0 && (
        <div className="text-center py-5">
          <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
            {searchQuery ? 'No games found matching your search.' : 'No games available yet.'}
          </p>
        </div>
      )}

      {/* Game Detail Modal */}
      <GameDetailModal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        game={selectedGame}
      />

      {/* Add Game Form Modal */}
      <AddGameForm
        show={showAddForm}
        onHide={() => setShowAddForm(false)}
        onGameAdded={handleGameAdded}
      />
    </Container>
  );
};

export default GamesPage;
