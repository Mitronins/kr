import React from 'react'
import Input from 'antd/es/input'
import { dataBase } from '../../../Root'
import { AUTHOR_TABLE, MUSICS_TABLE, PLAYLIST_TABLE } from '../../../constans'

import styles from './styles.scss'
import { Select } from 'antd'

class MusicViewCmp extends React.Component {
  state = {
    name: '',
    musics: [],
    allMusics: [],
  }

  getPlaylist = () => {
    const playlist = dataBase.queryAll(PLAYLIST_TABLE, { query: { ID: this.props.id } })[0]
    console.log(playlist)
    this.setState({
      name: playlist.name,
      musics: playlist.musics,
    })
  }

  addPlaylist = () => {
    const { name, musics } = this.state

    if (name && musics.length) {
      dataBase.insert(PLAYLIST_TABLE, {
        name: this.state.name,
        musics: this.state.musics,
      })
      dataBase.commit()
      this.props.updateIds()
    }
  }

  updatePlaylist = (order) => (e) => {
    switch (order) {
      case 1:
        this.setState({ name: e.target.value }, () => {
          this.updateDBRow()
        })
        break
      case 2:
        console.log(e)
        this.setState({ musics: e }, () => {
          this.updateDBRow()
        })
        break
    }

  }

  updateDBRow = () => {
    if (this.props.id) {
      dataBase.update(PLAYLIST_TABLE, { ID: this.props.id }, (row) => {
        row.name = this.state.name
        row.musics = this.state.musics

        return row
      })

      dataBase.commit()
    }
  }

  deletePlaylist = () => {
    dataBase.deleteRows(PLAYLIST_TABLE, { ID: this.props.id })
    dataBase.commit()
    this.props.updateIds()
  }

  componentDidMount() {
    if (!this.props.isAdding) {
      this.getPlaylist()
    }
    this.getMusics()
  }

  getMusics = () => {
    const allMusics = dataBase.queryAll(MUSICS_TABLE)
    this.setState({ allMusics })
  }

  render() {
    const { allMusics } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Название
          </div>
          <Input
            className={styles.input}
            value={this.state.name}
            onChange={this.updatePlaylist(1)}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Песни
          </div>
          <Select
            value={this.state.musics}
            className={styles.select}
            mode="multiple"
            onChange={this.updatePlaylist(2)}
          >
            {
              allMusics.map((a) => {
                return (
                  <Select.Option key={a.ID} value={a.ID}>
                    {a.name}
                  </Select.Option>
                )
              })
            }
          </Select>
        </div>
        <div className={styles.btnAdd} onClick={this.props.id ? this.deletePlaylist : this.addPlaylist}>
          {
            this.props.id ? 'Удалить' : 'Добавить'
          }
        </div>
      </div>
    )
  }
}

export const PlaylistView = MusicViewCmp
