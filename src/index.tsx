import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const container = document.getElementById('root')!;
const root = createRoot(container);
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/query`,
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
