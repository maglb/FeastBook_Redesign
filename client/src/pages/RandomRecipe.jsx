import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { search } from "../utils/API";
import { useMutation } from "@apollo/client";
import { ADD_RECIPE } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { FETCH_RECIPES_QUERY, QUERY_SINGLE_PROFILE } from "../utils/queries";

const RandomRecipe = () => {
  // create state for holding returned google api data
  const [randomRecipe, setRandomRecipe] = useState();
  const [addRecipe, { data }] = useMutation(ADD_RECIPE);
  const navigate = useNavigate();

  useEffect(() => {
    search()
      .then((res) => {
        console.log(res.data.meals[0]);
        const {
          strMeal: title,
          strMealThumb: image,
          strInstructions: instructions,
          ...meal
        } = res.data.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const measure = meal["strMeasure" + i];
          const ingredient = meal["strIngredient" + i];
          if (!measure || !ingredient) {
            break;
          }
          ingredients.push(measure + " " + ingredient);
        }
        setRandomRecipe({
          title,
          image,
          ingredients,
          instructions: instructions.split("\r\n").filter(Boolean),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSaveRecipe = async () => {
    try {
      console.log(randomRecipe);
      const { data } = await addRecipe({
        variables: randomRecipe,
        refetchQueries: [
          { query: FETCH_RECIPES_QUERY },
          { query: QUERY_SINGLE_PROFILE },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (randomRecipe) {
    console.log(randomRecipe);
    return (
      <RecipeCard recipe={randomRecipe}>
        {!data ? (
          <button className="button" type="submit" onClick={handleSaveRecipe}>
            Save Recipe
          </button>
        ) : (
          <button className="button" disabled>
            Saved!
          </button>
        )}
      </RecipeCard>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

export default RandomRecipe;
