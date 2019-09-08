import React from 'react';
import { Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import localStorageDB from 'localStorageDB';

import * as styles from './styles.scss'

import { store } from '../store';
import {createBrowserHistory} from 'history';
import {SINGS_TABLE, COMMENTS_TABLE} from "../constans";

export const history = createBrowserHistory();

export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(SINGS_TABLE, ["name", "author", "description", "album"]);
    dataBase.createTable(COMMENTS_TABLE, ["text", "date"]);

    dataBase.insert(SINGS_TABLE, { name: 'sing1', author: 'author1', description: 'description', album: 'album' });
    dataBase.commit();
}

function Root() {
    return (
        <Provider store={store}>
            <Router history={history}>
               <div>asd</div>
            </Router>
        </Provider>
    )
}

export default Root;
