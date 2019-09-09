import React from 'react';
import { dataBase } from '../../Root'
import { AuthorView } from './AuthorView/AuthorView'

import styles from './styles.scss'
import { AUTHOR_TABLE } from '../../constans'

class AuthorListCmp extends React.Component {
  state = {
    authorsIds: [],
    isAdding: true
  }
  getIds = () => {
    const authors = dataBase.queryAll(AUTHOR_TABLE).map((d) => d.ID)
    this.setState({ isAdding: false })
    this.setState({ authorsIds: authors})
  }

  componentDidMount() {
    this.getIds()
  }

  render() {

    return (
      <div className={styles.container}>
        {
          !this.state.authorsIds.length && !this.state.isAdding &&
            <div>
              Нет авторов
            </div>
        }
        {
          !!this.state.authorsIds.length &&
            this.state.authorsIds.map((id) => <AuthorView key={id} id={id} updateIds={this.getIds}/>)
        }
        {
          this.state.isAdding &&
          <AuthorView isAdding updateIds={this.getIds}/>
        }
        <div className={styles.btnAdd} onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
          +
        </div>
      </div>
    )
  }
}

export const AuthorList = AuthorListCmp
