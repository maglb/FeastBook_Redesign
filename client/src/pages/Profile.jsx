import React, { useState, useEffect } from 'react';
import AuthService from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_RECIPES_QUERY, QUERY_SINGLE_PROFILE } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import RecipeItem from '../components/RecipeItem';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button } from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate();
  const [removeRecipe, { error: deleteError }] = useMutation(REMOVE_RECIPE , {
    refetchQueries: [
      QUERY_SINGLE_PROFILE,
    ],
  });

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate('/');
    }
  }, [navigate]);


  const { loading, data, error } = useQuery(QUERY_SINGLE_PROFILE);

  const userData = data?.profile || {};

  const [recipeVisibility, setRecipeVisibility] = useState({});

  const toggleRecipeVisibility = (recipeId) => {
    setRecipeVisibility((prevState) => ({
      ...prevState,
      [recipeId]: !prevState[recipeId],
    }));
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await removeRecipe({
        variables: { recipeId },
        refetchQueries: [{ query: QUERY_SINGLE_PROFILE },
        {query: FETCH_RECIPES_QUERY},]
      });
    } catch (e) {
      console.error("Error deleting recipe:", e);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!userData.recipes) return <div>No recipes found.</div>;

  return (
    <div>
      <h1 className="profile-name">{userData.username}'s Recipes</h1>
      {userData.recipes.map((recipe) => (
        <div className="single-recipe-card" key={recipe._id}>
          <div className="single-card-header">{recipe.title}</div>
          <div className="single-card-body">
            <p className="content">{recipe.description}</p>
            <button
              className="btn-view-details"
              onClick={() => toggleRecipeVisibility(recipe._id)}
            >
              {recipeVisibility[recipe._id] ? "Hide Details" : "View Details"}
            </button>
            <Button
        className="btn-danger btn-view-details"
        onClick={() => handleDeleteRecipe(recipe._id)}
        disabled={loading}
        style={{
          marginLeft: "10px",
          margin: "20px auto",
          display: "block",
          fontFamily: "Roboto",
        }}
      >
        Delete
      </Button>
            {recipeVisibility[recipe._id] && (
              <div>
                {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                {recipe.prepTime && <p>Prep Time: {recipe.prepTime}</p>}
                {recipe.cookTime && <p>Cook Time: {recipe.cookTime}</p>}
                <h6 className="subtitle">Ingredients:</h6>
                <ul className="list-unstyled">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h6 className="subtitle">Instructions:</h6>
                <ol className="list-unstyled">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
