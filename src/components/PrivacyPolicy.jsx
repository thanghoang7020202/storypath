// create a new component called Contact that will display list of contacts phone numbers and email addresses, and a contact form.
import React from 'react';
import { Container, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <Container>
        <h1>Contact Us</h1>
        <p>
            StoryPath is a recipe website built with React. You can view a list of recipes by clicking the link below.
        </p>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Link to="/recipes" className="btn btn-primary">Submit</Link>
        </Form>
        </Container>
    );
    }

export default Contact;