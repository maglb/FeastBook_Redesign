const { Profile, Recipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError } = require('graphql');
 

const resolvers = {
  Query: {
    // Fetch all profiles
    profiles: async () => {
      return await Profile.find();
    },
    // Fetch a single profile by ID
    profile: async (_, args, context) => {
      if (context.user) {
        return await Profile.findById(context.user._id).populate('recipes');
      }
      throw AuthenticationError
    },
    // Fetch all recipes
    recipes: async () => {
      return await Recipe.find().populate('profile');
    },
    // Fetch a single recipe by ID
    recipe: async (_, args, context) => {
      return await Recipe.findById(args.id).populate('profile');
    },
  },
  Mutation: {
    // Create an account with hashed password and return JWT token
    createAccount: async (_, { username, email, password }) => {
      const user = await Profile.create({
        username,
        email,
        password,
      });

      const token = signToken(user);

      return { token, user };
    },
    // Add a recipe to a user's profile
    addRecipe: async (_, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to perform this action.');
      }
    
      // Add the profile ID to the recipe document
      const recipeData = {
        ...args,
        profile: context.user._id  // Assuming context.user._id contains the Profile ID of the logged-in user
      };
    
      try {
        // Create the new recipe with the profile reference
        const newRecipe = await Recipe.create(recipeData);

        // Optionally, push the new recipe's ID to the user's profile
        // This step might not be necessary if you decide to query recipes directly 
        // without relying on the user's recipe array
        await Profile.findByIdAndUpdate(
          context.user._id,
          { $push: { recipes: newRecipe._id } },
          { new: true }
        );
    
        // Populate the profile information in the newly created recipe before returning
        // Note: This assumes you want to return the full recipe document including the profile info.
        // You might need to adjust based on your front-end expectations.
        return Recipe.findById(newRecipe._id).populate('profile');
      } catch (error) {
        console.error("Error adding new recipe:", error);
        throw new GraphQLError("Failed to add new recipe.", { extensions: { code:'BAD_USER_INPUT' } });
      }
    },
    
    // Remove an account by ID
    // removeAccount: async (_, { profileId }) => {
    //     return await Profile.findByIdAndDelete(profileId);
    // },
    // Remove a recipe from a user's profile
    removeRecipe: async (_, { recipeId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to perform this action.');
      }
  
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new Error('Recipe not found');
      }
  
      if (recipe.profile.toString() !== context.user._id) {
        throw new AuthenticationError('You do not have permission to delete this recipe.');
      }
  
      // Delete the recipe
      await Recipe.findByIdAndDelete(recipeId);
  
      await Profile.findByIdAndUpdate(
        context.user._id,
        { $pull: { recipes: recipeId } }
      );
  
      return recipe;
    },
  
    login: async (_, { email, password }) => {
      // Find the user by email
      const user = await Profile.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Compare the submitted password using the isCorrectPassword method
      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new Error('Wrong password');
      }

      // If the passwords match, generate and return the JWT token
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;