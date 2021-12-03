import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { RecipeInProgress } from '../components';

function InProgressDrinks({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const details = result.meals || result.drinks;
      if (isMounted) setRecipe(details);
    };
    fetchRecipe();
    return () => { isMounted = false; };
  }, [id, setRecipe]);

  return (
    <main>
      { recipe.map((oneRecipe) => (
        <RecipeInProgress key="0" recipe={ oneRecipe } type="Drink" />)) }
    </main>
  );
}

InProgressDrinks.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default InProgressDrinks;
