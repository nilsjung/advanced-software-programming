import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Register from './components/Login';

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
        <Router>
            <nav class='container'>
                <ul class='nav nav-tabs nav-fill'>
                    <li class='nav-item'>
                        <Link className='nav-link' to='register'>Register</Link>
                    </li>
                    <li class='nav-item'>
                        <Link className='nav-link' to='chat'>Chat</Link>
                    </li>
                </ul>
                <div>
                    <Route exact path='/register' component={Register} />
                    <Route path='/chat' component={App} />
                </div>
            </nav>
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
