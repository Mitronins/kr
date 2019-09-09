import React from 'react';
import { dataBase } from '../../Root'
import { PlaylistView } from './PlaylistView/PlaylistView'

import styles from './styles.scss'
import { MUSICS_TABLE, PLAYLIST_TABLE } from '../../constans'

class AuthorListCmp extends React.Component {
  state = {
    playlistsIds: [],
    isAdding: true
  }
  getIds = () => {
    const playlistsIds = dataBase.queryAll(PLAYLIST_TABLE).map((d) => d.ID)
    this.setState({ isAdding: false })
    this.setState({ playlistsIds })
  }

  componentDidMount() {
    this.getIds()
  }

  render() {

    return (
      <div className={styles.container}>
        {
          !this.state.playlistsIds.length && !this.state.isAdding &&
            <div>
              Нет плейлистов
            </div>
        }
        {
          !!this.state.playlistsIds.length &&
            this.state.playlistsIds.map((id) => <PlaylistView key={id} id={id} updateIds={this.getIds}/>)
        }
        {
          this.state.isAdding &&
          <PlaylistView isAdding updateIds={this.getIds}/>
        }
        <div className={styles.btnAdd} onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
          +
        </div>
      </div>
    )
  }
}

export const PlaylistList = AuthorListCmp
