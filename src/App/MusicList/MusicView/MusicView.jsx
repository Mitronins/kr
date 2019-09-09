import React from 'react'
import Input from 'antd/es/input'
import { dataBase } from '../../../Root'
import { AUTHOR_TABLE, MUSICS_TABLE } from '../../../constans'

import styles from './styles.scss'
import { Select } from 'antd'

class MusicViewCmp extends React.Component {
  state = {
    name: '',
    author: '',
    year: '',
    comments: [],
    authors: [],
  }

  getMusic = () => {
    const music = dataBase.queryAll(MUSICS_TABLE, { query: { ID: this.props.id } })[0]
    this.setState({
      name: music.name,
      author: music.author,
      year: music.year,
      comments: music.comments,
    })
  }

  addMusic = () => {
    const { name, author, year } = this.state

    if (name && author && year) {
      dataBase.insert(MUSICS_TABLE, {
        name: this.state.name,
        author: this.state.author,
        year: this.state.year,
        comments: [],
      })
      dataBase.commit()
      this.props.updateIds()
    }
  }

  updateMusic = (order) => (e) => {
    switch (order) {
      case 1:
        this.setState({ name: e.target.value }, () => {
          this.updateDBRow()
        })
        break
      case 2:
        this.setState({ author: e }, () => {
          this.updateDBRow()
        })
        break
      case 3:
        this.setState({ year: e.target.value }, () => {
          this.updateDBRow()
        })
        break
    }

  }

  updateDBRow = () => {
    if (this.props.id) {
      dataBase.update(MUSICS_TABLE, { ID: this.props.id }, (row) => {
        row.name = this.state.name
        row.author = this.state.author
        row.year = this.state.year

        return row
      })

      dataBase.commit()
    }
  }

  deleteMusic = () => {
    dataBase.deleteRows(MUSICS_TABLE, { ID: this.props.id })
    dataBase.commit()
    this.props.updateIds()
  }

  componentDidMount() {
    if (!this.props.isAdding) {
      this.getMusic()
    }
    this.getAuthors()
  }

  getAuthors = () => {
    const authors = dataBase.queryAll(AUTHOR_TABLE)
    this.setState({ authors })
  }

  render() {
    const { authors } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Название
          </div>
          <Input
            className={styles.input}
            value={this.state.name}
            onChange={this.updateMusic(1)}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Автор
          </div>
          <Select
            value={this.state.author}
            className={styles.select}
            onChange={this.updateMusic(2)}
          >
            {
              authors.map((a) => {
                return (
                  <Select.Option key={a.ID} value={a.ID}>
                    {a.name}
                  </Select.Option>
                )
              })
            }
          </Select>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Год
          </div>
          <Input
            value={this.state.year}
            className={styles.input}
            onChange={this.updateMusic(3)}
          />
        </div>
        <div className={styles.btnAdd} onClick={this.props.id ? this.deleteMusic : this.addMusic}>
          {
            this.props.id ? 'Удалить' : 'Добавить'
          }
        </div>
      </div>
    )
  }
}

export const MusicView = MusicViewCmp
