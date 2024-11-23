import RecipeItem from "../RecipeItem";
import { FETCH_RECIPES_QUERY } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import './RecipeList.css';
import React, { useState, useEffect } from "react";


export default function RecipeList() {
  const { loading, data } = useQuery(FETCH_RECIPES_QUERY);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data?.recipes) {
      const sortedRecipes = [...data.recipes].sort((a, b) => b._id.localeCompare(a._id));
      setRecipes(sortedRecipes);
    }
  }, [data?.recipes]);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="container pt-4">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe._id}
          _id={recipe._id}
          author={recipe.profile.username}
          title={recipe.title}
          description={recipe.description}
          image={recipe.image}
          instructions={recipe.instructions}
          ingredients={recipe.ingredients}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
        />
      ))}
    </div>
  );
};
