// Game Card Component
// Displays individual game information in a card format
// Supports add/remove actions for user collections

import { Card, Button, Badge } from 'react-bootstrap';

const GameCard = ({ game, onAdd, onRemove, onViewDetails, isInCollection = false, showActions = true }) => {
  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  return (
    <Card
      className="h-100 game-card"
      style={{
        background: 'rgba(30, 27, 75, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        backdropFilter: 'blur(10px)',
        color: '#e2e8f0',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = '#6366f1';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: '#a78bfa', fontSize: '1.1rem' }}>
          {game.title}
        </Card.Title>
        <div className="mb-2">
          <Badge
            bg="none"
            style={{
              background: 'rgba(99, 102, 241, 0.3)',
              color: '#c4b5fd',
              marginRight: '5px',
            }}
          >
            {game.genre}
          </Badge>
          <Badge
            bg="none"
            style={{
              background: 'rgba(52, 211, 153, 0.3)',
              color: '#6ee7b7',
            }}
          >
            {game.platform}
          </Badge>
        </div>
        <Card.Text style={{ fontSize: '0.85rem', color: '#94a3b8', flex: 1 }}>
          {game.description?.length > 100
            ? `${game.description.substring(0, 100)}...`
            : game.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
            {renderStars(game.rating / 2)} {game.rating?.toFixed(1)}
          </span>
          <small style={{ color: '#64748b' }}>
            {game.developer} · {game.releaseYear}
          </small>
        </div>
        {showActions && (
          <div className="d-flex gap-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => onViewDetails?.(game)}
              style={{ flex: 1, borderColor: '#6366f1', color: '#a78bfa' }}
            >
              Details
            </Button>
            {isInCollection ? (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemove?.(game._id)}
                style={{ flex: 1 }}
              >
                Remove
              </Button>
            ) : (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => onAdd?.(game._id)}
                style={{ flex: 1 }}
              >
                + Add
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default GameCard;
