import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import reducers from './reducers';
import App from './App';

// imports the bootstrap js part installed via dependencies
import 'bootstrap';

// this is the entry-point for our styles. no further loading neccessary
import './sass/main.scss';

import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import startChat from './socket';
import { chatMiddleware } from './socket/chat';

const createStoreWithMiddleware = applyMiddleware(chatMiddleware, thunk)(
    createStore
);
const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

startChat(store);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
