// using react-bootstrap to have a empty default About component
import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
    return (
        <Container>
        <h1>About Us</h1>
        <p>
            StoryPath is a recipe website built with React. You can view a list of recipes by clicking the link below.
        </p>
        </Container>
    );
    }

export default About;