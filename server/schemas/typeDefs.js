
const typeDefs = `
type Profile {
  _id: ID
  username: String
  email: String
  recipes: [Recipe]
}

type Recipe {
  _id: ID
    title: String
    description: String
    image: String
    prepTime: String
    cookTime: String
    ingredients: [String]
    instructions: [String]
    profile: Profile
}

type AuthPayload {
  token: String
  user: Profile
}

type Query {
  profiles: [Profile]!
  profile: Profile
}

type Query {
  recipes: [Recipe]!
  recipe: Recipe
}

type Mutation {
  createAccount(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  addRecipe(title: String!, description: String, image: String, prepTime: String, cookTime: String, ingredients: [String!]!, instructions: [String!]!): Profile
  #removeAccount(profileId: ID!): Profile
  removeRecipe(recipeId: ID!): Recipe
}
`;

module.exports = typeDefs;
