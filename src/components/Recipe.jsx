import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Recipe({ recipes }) {

    Recipe.propTypes = {
        recipes: PropTypes.array.isRequired,
    };

    const { id } = useParams();
    const recipe = recipes.find(r => r.id === id);
    
    if (!recipe) {
        return <div>Recipe not found</div>;
    }
    
    const { title, author, rating, description, ingredients, steps } = recipe;
    
    return (
        <div>
            <h1>{title}</h1>
            <p>By {author}</p>
            <p>Rating: {rating}</p>
            <p>{description}</p>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.amount} {ingredient.item}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}
