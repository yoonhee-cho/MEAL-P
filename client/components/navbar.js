import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div className="navbar">
    <div className="navbar__logo">
      <i className="fas fa-utensils" />
      <Link to="/home" className="navbar__logo-text">
        MEAL :P
      </Link>
    </div>

    {isLoggedIn ? (
      <ul className="navbar__menu">
        {/* The navbar will show these links after you log in */}
        {/* <li><Link to="/home">Home</Link></li> */}
        <li>
          <Link to="/recipeSearch">Recipe Search</Link>
        </li>
        <li>
          <Link to={'/weeklyprices/' + userId}>Meal Plan</Link>
        </li>
        <li>
          <Link to="/home">My Recipes</Link>
        </li>
      </ul>
    ) : (
      <div className="navbar__menu" />
    )}

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
