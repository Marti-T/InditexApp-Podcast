import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { PodcastApp } from './PodcastApp';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PodcastApp />
    </BrowserRouter>
  </React.StrictMode>,
)
