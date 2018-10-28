import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Register from './components/Login';

import startChat, {chatMiddleware} from './api';

import initialState from './store/'

const createStoreWithMiddleware = applyMiddleware(chatMiddleware, thunk)(createStore)
const store = createStoreWithMiddleware(reducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

startChat(store);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <nav className='container'>
                <ul className='nav nav-tabs nav-fill'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='register'>Register</Link>
                    </li>
                    <li className='nav-item'>
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
