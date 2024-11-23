import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      recipes
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
query profile {
  profile {
    _id
    email
    username
    recipes {
      _id
      cookTime
      image
      description
      ingredients
      instructions
      prepTime
      title
    }
  }
}
`;

export const FETCH_RECIPES_QUERY = gql`
query recipes {
  recipes {
    _id
    title
    description
    image
    prepTime
    cookTime
    ingredients
    instructions
    profile {
      username
    }
  }
}
`;
