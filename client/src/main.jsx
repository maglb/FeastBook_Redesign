import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import LoginForm from "./pages/LoginForm.jsx";
import CreateAccountForm from "./pages/CreateAccount";
import RecipeForm from "./components/RecipeCards/RecipeCard.jsx";
import RandomRecipe from "./pages/RandomRecipe.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <CreateAccountForm />,
      },
      {
        path: "/add-recipe",
        element: <RecipeForm />,
      },
      {
        path: "/random-recipe",
        element: <RandomRecipe />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
