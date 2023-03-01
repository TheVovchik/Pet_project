/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from './style/chakraTheme';
import { AppRoutes } from './app-routes/AppRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Router>
    <ChakraProvider theme={chakraTheme}>
      <AppRoutes />
    </ChakraProvider>
  </Router>,
);
