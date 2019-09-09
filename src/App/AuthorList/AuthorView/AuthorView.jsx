import React from 'react'
import Input from 'antd/es/input'
import { dataBase } from '../../../Root'
import { AUTHOR_TABLE } from '../../../constans'

import styles from './styles.scss'

class AuthorViewCmp extends React.Component {
  state = {
    name: '',
    birthDate: '',
    nationality: '',
  }

  getAuthor = () => {
    const author = dataBase.queryAll(AUTHOR_TABLE, { query: { ID: this.props.id } })[0]
    this.setState({
      name: author.name,
      birthDate: author.birthDate,
      nationality: author.nationality,
    })
    console.log(author)
    console.log(author.name)
  }

  addAuthor = () => {
    const { name, birthDate, nationality } = this.state
    if (name && birthDate && nationality) {
      const newUserId = dataBase.insert(AUTHOR_TABLE, {
        name: this.state.name,
        birthDate: this.state.birthDate,
        nationality: this.state.nationality,
      })
      dataBase.commit()
      this.props.updateIds()
    }
  }

  updateAuthor = (order) => (e) => {
    switch (order) {
      case 1:
        this.setState({ name: e.target.value }, () => {
          this.updateDBRow()
        })
        break
      case 2:
        this.setState({ birthDate: e.target.value }, () => {
          this.updateDBRow()
        })
        break
      case 3:
        this.setState({ nationality: e.target.value }, () => {
          this.updateDBRow()
        })
        break
    }

  }

  updateDBRow = () => {
    if (this.props.id) {
      dataBase.update(AUTHOR_TABLE, {ID: this.props.id}, (row) => {
        row.name = this.state.name;
        row.birthDate = this.state.birthDate;
        row.nationality = this.state.nationality;

        return row;
      });

      dataBase.commit();
    }
  }

  deleteAuthor = () => {
    dataBase.deleteRows(AUTHOR_TABLE, {ID: this.props.id});
    dataBase.commit();
    this.props.updateIds();
  }

  componentDidMount() {
    if (!this.props.isAdding) {
      this.getAuthor()
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Имя
          </div>
          <Input
            className={styles.input}
            value={this.state.name}
            onChange={this.updateAuthor(1)}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Дата рождения
          </div>
          <Input
            value={this.state.birthDate}
            className={styles.input}
            onChange={this.updateAuthor(2)}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>
            Гражданство
          </div>
          <Input
            value={this.state.nationality}
            className={styles.input}
            onChange={this.updateAuthor(3)}
          />
        </div>
        <div className={styles.btnAdd} onClick={this.props.id ? this.deleteAuthor : this.addAuthor}>
          {
            this.props.id ? 'Удалить' : 'Добавить'
          }
        </div>
      </div>
    )
  }
}

export const AuthorView = AuthorViewCmp
