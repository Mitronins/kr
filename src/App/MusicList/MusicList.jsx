import React from 'react';
import { dataBase } from '../../Root'
import { MUSICS_TABLE } from '../../constans'

class MusicListCmp extends React.Component {
  getIds = () => {
    const musics = dataBase.queryAll(MUSICS_TABLE)
    console.log(musics)
  }

  componentDidMount() {
    this.getIds()
  }

  render() {

    return (
      <div>
        list
      </div>
    )
  }
}

export const MusicList = MusicListCmp
