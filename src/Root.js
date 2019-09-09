import React from 'react';
import {Provider} from 'react-redux';
import localStorageDB from 'localstoragedb';

import { store } from './store';
import { MUSICS_TABLE, USERS_TABLE, AUTHOR_TABLE, PLAYLIST_TABLE } from './constans'
import App from './App/App'


export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(MUSICS_TABLE, ["name", "author", "year", "comments"]);
    dataBase.createTable(AUTHOR_TABLE, ["name", "birthDate", "nationality"]);
    dataBase.createTable(PLAYLIST_TABLE, ["name", "sings"]);
    dataBase.createTable(USERS_TABLE, ["login", "pass"]);

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
