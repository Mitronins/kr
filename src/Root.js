import React from 'react';
import {Provider} from 'react-redux';
import localStorageDB from 'localstoragedb';

import { store } from './store';
import { MUSICS_TABLE, COMMENTS_TABLE, USERS_TABLE } from './constans'
import App from './App/App'


export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(MUSICS_TABLE, ["name", "author", "description", "album"]);
    dataBase.createTable(COMMENTS_TABLE, ["text", "date"]);
    dataBase.createTable(USERS_TABLE, ["login", "pass"]);

    dataBase.insert(MUSICS_TABLE, { name: 'sing1', author: 'author1', description: 'description', album: 'album' });
    dataBase.commit();
}

function Root() {
    return (
        <Provider store={store}>
          <App/>
        </Provider>
    )
}

export default Root;
