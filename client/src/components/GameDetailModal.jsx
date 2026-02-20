// Game Detail Modal Component
// Displays detailed information about a selected game
// Uses React-Bootstrap Modal for overlay display

import { Modal, Badge, Row, Col } from 'react-bootstrap';

const GameDetailModal = ({ show, onHide, game }) => {
  if (!game) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      contentClassName="bg-dark text-light"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          background: 'rgba(15, 12, 41, 0.95)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <Modal.Title style={{ color: '#a78bfa' }}>{game.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: 'rgba(15, 12, 41, 0.95)',
        }}
      >
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <strong style={{ color: '#6366f1' }}>Genre:</strong>
              <Badge
                className="ms-2"
                bg="none"
                style={{ background: 'rgba(99, 102, 241, 0.3)', color: '#c4b5fd' }}
              >
                {game.genre}
              </Badge>
            </div>
            <div className="mb-3">
              <strong style={{ color: '#6366f1' }}>Platform:</strong>
              <span className="ms-2" style={{ color: '#e2e8f0' }}>
                {game.platform}
              </span>
            </div>
            <div className="mb-3">
              <strong style={{ color: '#6366f1' }}>Developer:</strong>
              <span className="ms-2" style={{ color: '#e2e8f0' }}>
                {game.developer}
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <strong style={{ color: '#6366f1' }}>Release Year:</strong>
              <span className="ms-2" style={{ color: '#e2e8f0' }}>
                {game.releaseYear}
              </span>
            </div>
            <div className="mb-3">
              <strong style={{ color: '#6366f1' }}>Rating:</strong>
              <span className="ms-2" style={{ color: '#fbbf24', fontSize: '1.2rem' }}>
                ★ {game.rating?.toFixed(1)} / 10
              </span>
            </div>
          </Col>
        </Row>
        <div className="mt-3">
          <strong style={{ color: '#6366f1' }}>Description:</strong>
          <p className="mt-2" style={{ color: '#94a3b8', lineHeight: '1.6' }}>
            {game.description || 'No description available.'}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GameDetailModal;
