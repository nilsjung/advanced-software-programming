import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
registerServiceWorker();
