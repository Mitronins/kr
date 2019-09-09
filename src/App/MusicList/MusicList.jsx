import React from 'react';
import { dataBase } from '../../Root'
import { MusicView } from './MusicView/MusicView'

import styles from './styles.scss'
import { MUSICS_TABLE } from '../../constans'

class AuthorListCmp extends React.Component {
  state = {
    musicsIds: [],
    isAdding: true
  }
  getIds = () => {
    const authors = dataBase.queryAll(MUSICS_TABLE).map((d) => d.ID)
    this.setState({ isAdding: false })
    this.setState({ musicsIds: authors})
  }

  componentDidMount() {
    this.getIds()
  }

  render() {

    return (
      <div className={styles.container}>
        {
          !this.state.musicsIds.length && !this.state.isAdding &&
            <div>
              Нет песен
            </div>
        }
        {
          !!this.state.musicsIds.length &&
            this.state.musicsIds.map((id) => <MusicView key={id} id={id} updateIds={this.getIds}/>)
        }
        {
          this.state.isAdding &&
          <MusicView isAdding updateIds={this.getIds}/>
        }
        <div className={styles.btnAdd} onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
          +
        </div>
      </div>
    )
  }
}

export const MusicList = AuthorListCmp
