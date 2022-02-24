import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { REPO_NAME } from './constans/repo';

import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={`${REPO_NAME}`}>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);