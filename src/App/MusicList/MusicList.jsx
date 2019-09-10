import React from 'react'
import { dataBase } from '../../Root'
import { MusicView } from './MusicView/MusicView'

import styles from './styles.scss'
import { MUSICS_TABLE } from '../../constans'
import { Input } from 'antd'

class AuthorListCmp extends React.Component {
  state = {
    musicsIds: [],
    isAdding: true,
    text: '',
  }
  getIds = () => {
    const { text } = this.state
    const params = text && {
      query: (row) => {
        console.log(row)
        if (row.name.includes(text)) {
          return true
        } else {
          return false
        }
      }
    }
    const musicsIds = dataBase.queryAll(MUSICS_TABLE, params).map((d) => d.ID)
    this.setState({ isAdding: false })
    this.setState({ musicsIds })
  }

  componentDidMount() {
    this.getIds()
  }

  render() {

    return (
      <div className={styles.container}>
        <Input
          className={styles.input}
          placeholder={'Поиск песен'}
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value }, () => this.getIds())}
        />
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
