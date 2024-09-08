import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeList({ recipes }) {

    RecipeList.propTypes = {
        recipes: PropTypes.array.isRequired,
    };

    return (
        // <div>
        // <h1 className="mb-4">List of Recipes</h1>
        // <ul className="list-group">
        //     {recipes.map(recipe => (
        //     <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
        //         <Link to={`/recipe/${recipe.id}`} className="text-decoration-none">
        //         {recipe.title}
        //         </Link>
        //         <span className="badge bg-primary rounded-pill">Rating: {recipe.rating}/5</span>
        //     </li>
        //     ))}
        // </ul>
        // </div>
        <Container>
            <h1 className="mb-4">List of Recipes</h1>
            <ListGroup>
                {recipes.map(recipe => (
                    <ListGroup.Item key={recipe.id} className="d-flex justify-content-between align-items-center">
                        <Link to={`/recipe/${recipe.id}`} className="text-decoration-none">
                            {recipe.title}
                        </Link>
                        <span className="badge bg-primary rounded-pill">Rating: {recipe.rating}/5</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default RecipeList;