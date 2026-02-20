// Add Game Form Component
// Provides a form for creating new games in the library
// Uses React-Bootstrap form components and React Hooks

import { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createGame } from '../services/game.service';

const AddGameForm = ({ show, onHide, onGameAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: '',
    releaseYear: new Date().getFullYear(),
    developer: '',
    rating: 0,
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change using ES6+ computed property names
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'releaseYear' || name === 'rating' ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newGame = await createGame(formData);
      onGameAdded?.(newGame);
      // Reset form
      setFormData({
        title: '',
        genre: '',
        platform: '',
        releaseYear: new Date().getFullYear(),
        developer: '',
        rating: 0,
        description: '',
      });
      onHide();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create game');
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
        <Modal.Title style={{ color: '#a78bfa' }}>Add New Game</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'rgba(15, 12, 41, 0.95)' }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter game title"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Genre *</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Action RPG"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Platform *</Form.Label>
                <Form.Control
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                  placeholder="e.g., PC, PlayStation 5"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Developer *</Form.Label>
                <Form.Control
                  type="text"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  required
                  placeholder="Enter developer name"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Release Year *</Form.Label>
                <Form.Control
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  required
                  min={1970}
                  max={2030}
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6366f1' }}>Rating (0-10)</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min={0}
                  max={10}
                  step={0.1}
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#6366f1' }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter game description"
              style={inputStyle}
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              style={{
                background: '#6366f1',
                border: 'none',
              }}
            >
              {loading ? 'Adding...' : 'Add Game'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddGameForm;
