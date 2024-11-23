import "../RecipeCards/RecipeCard.css";

//Displays Recipe card
const RecipeCard = ({ recipe, children }) => {
  return (
    <div className="recipe-card">
      <h2 className="word">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />

      {recipe.prepTime && <p className="time">Prep Time: {recipe.prepTime}</p>}
      {recipe.cookTime && <p className="time">Cook Time: {recipe.cookTime}</p>}
      <h3 className="word">Ingredients</h3>
      <ul
        className="list"
        style={{
          textAlign: "center",
          fontFamily: "Roboto",
          fontSize: "18px",
        }}
      >
        {recipe.ingredients.map((ingredient, index) => (
          <li style={{ marginBottom: "1%" }} key={index}>
            {ingredient}
          </li>
        ))}
      </ul>
      <h3 className="word">Instructions</h3>
      <ul className="list" style={{ fontFamily: "Roboto", fontSize: "18px" }}>
        {recipe.instructions.map((instruction, index) => (
          <li style={{ marginBottom: "2%", lineHeight: "22px" }} key={index}>
            {instruction}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default RecipeCard;
