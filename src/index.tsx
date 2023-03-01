/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import chakraTheme from './style/chakraTheme';
import { AppRoutes } from './app-routes/AppRoutes';
import { store } from './storage/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Router>
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme}>
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  </Router>,
);
