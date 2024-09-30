import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    message: ''
  });

  // State for form submission status
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (ensure email and phone are filled)
    if (formData.email && formData.phoneNumber) {
      setSubmitted(true);
      setError(false);

      // Here you can integrate API requests or any other action
      console.log('Form data submitted:', formData);

      // Reset form
      setFormData({
        email: '',
        phoneNumber: '',
        message: ''
      });
    } else {
      setError(true);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>

      <p className="text-center">
        If you have any questions, feel free to reach out via the form below or through our contact details:
      </p>

      <ul className="list-unstyled text-center">
        <li>Email: <a href="mailto:s4759487@uq.edu.au">s4759487@uq.edu.au</a></li>
        <li>Phone: +123-456-7890</li> {/* hidden */}
      </ul>

      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Thank you! Your message has been sent.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(false)} dismissible>
          Please fill out both the email and phone number fields.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Contact;
