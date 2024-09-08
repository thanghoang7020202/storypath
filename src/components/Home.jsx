import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container>
          <h1>Welcome to the Recipe Website</h1>
          <p>
            This is a recipe website built with React. You can view a list of recipes by clicking the link below.
          </p>
          <Link to="/recipes" className="btn btn-primary">View Recipes</Link>
    </Container>
  );
}

export default Home;