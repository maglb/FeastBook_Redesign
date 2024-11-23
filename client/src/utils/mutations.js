import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
mutation addRecipe($title: String!, $description: String, $image: String, $prepTime: String, $cookTime: String, $ingredients: [String!]!, $instructions: [String!]!) {
  addRecipe(title: $title, description: $description, image: $image, prepTime: $prepTime, cookTime: $cookTime, ingredients: $ingredients, instructions: $instructions) {
    _id
    username
    email
    recipes {
      _id
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
    }
  }
`;
