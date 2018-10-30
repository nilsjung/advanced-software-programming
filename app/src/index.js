import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import reducers from './reducers';
import App from './App';
import Login from './components/login/';
// imports the bootstrap js part installed via dependencies
import 'bootstrap';

// this is the entry-point for our styles. no further loading neccessary
import './sass/main.scss';

import startChat, {chatMiddleware} from './api';

const initialState = {
    userId: '',
    messages: [],
    currentMessage: ''
}

const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

startChat(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
