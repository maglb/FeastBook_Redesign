import axios from "axios";

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// random recipe API

export const search = async () =>
  axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);

export const fetchAllRecipes = async () => {
  try {
    const response = await fetch("/api/recipes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};
