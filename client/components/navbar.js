import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Burger from './Burger'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div className="navbar">
    <div className="navbar__logo">
      <i className="fas fa-utensils" />
      <Link to="/home" className="navbar__logo-text">
        MEAL :P
      </Link>
    </div>

    {isLoggedIn ? <Burger userId={userId} /> : <div className="navbar__menu" />}

    {isLoggedIn ? (
      <div className="navbar__button">
        <a href="#" onClick={handleClick} className="nav-button">
          {' '}
          Logout{' '}
        </a>
      </div>
    ) : (
      <div className="navbar__button">
        {/* The navbar will show these links before you log in */}
        <Link to="/login" className="nav-button">
          Login
        </Link>
        <Link to="/signup" className="nav-button">
          Sign Up
        </Link>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
