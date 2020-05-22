import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store'
import { Provider } from 'react-redux'
// var cv = require('opencv4nodejs');
//     const mat = cv.imread('./assets/img/11111.png');
//    cv.imwrite('./assets/img/test.png', mat);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
