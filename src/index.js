import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers/home.reducer';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./containers/home.container";

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={HomePage} />
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);