import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss';
import {App} from './app';
import {rootStore} from "./app/model";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={rootStore}>
    <App/>
  </Provider>
);
