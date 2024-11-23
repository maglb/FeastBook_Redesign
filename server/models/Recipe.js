const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  prepTime: {
    type: String,
  },
  cookTime: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  instructions: [
    {
      type: String,
    },
  ],
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;