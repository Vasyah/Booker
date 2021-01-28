import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>, rootEl
);
