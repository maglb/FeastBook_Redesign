import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import AuthService from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  
  const hideHeaderAndFooter = location.pathname === '/' || location.pathname === '/signup';

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        {!hideHeaderAndFooter && <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        <div className="container">
          <Outlet />
        </div>
        {!hideHeaderAndFooter && <Footer />}
      </div>
    </ApolloProvider>
  );
}

export default App;