import React from 'react'
import styles from './styles.scss'
import { connect } from 'react-redux'
import { setAuth } from '../../AC/users'
import { NavLink } from 'react-router-dom'


class HeaderCmp extends React.Component {
  exit = () => {
    this.props.setAuth(undefined)
  }

  render() {
    return (
      <div className={styles.root}>
        <NavLink className={styles.nav} to='/sings'>Песни</NavLink>
        <NavLink className={styles.nav} to='/authors'>Авторы</NavLink>
        <NavLink className={styles.nav} to='/playlists'>Плейлисты</NavLink>
        <div onClick={this.exit} className={styles.btn}>
          Выйти
        </div>
      </div>
    )
  }
}

export const Header = connect(null, { setAuth })(HeaderCmp)
