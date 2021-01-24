import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import Burger from './Burger'
import {Button} from '../Button'

const Navbar = ({handleClick, isLoggedIn, userId}) => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to="/home">
          <i className="fas fa-utensils" />MEAL :P
        </Link>
      </h1>

      {/* <Burger open={open} setOpen={setOpen} />  */}

      <div
        className="menu-icon"
        open={open}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
      </div>

      {isLoggedIn ? (
        <ul className={open ? 'nav-menu active' : 'nav-menu'}>
          {/* <li><Link to="/home">Home</Link></li> */}
          <li>
            <Link className="nav-links" to="/recipeSearch">
              Recipe Search
            </Link>
          </li>
          <li>
            <Link className="nav-links" to={'/weeklyprices/' + userId}>
              Meal Plan
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/home">
              My Recipes
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleClick} className="nav-button-mobile">
              {' '}
              Logout{' '}
            </a>
          </li>
        </ul>
      ) : (
        <div className={open ? 'nav-menu active' : 'nav-menu'}>
          {/* <Link to="/login" className="nav-button-mobile"><Button>Login</Button></Link>
            <Link to="/signup" className="nav-button-mobile"><Button>Sign Up</Button></Link> */}
          <Link to="/login" className="nav-button-mobile">
            Login
          </Link>
          <Link to="/signup" className="nav-button-mobile">
            Sign Up
          </Link>
        </div>
      )}

      {isLoggedIn ? (
        <div className="navbar__button">
          <a href="#" onClick={handleClick}>
            {' '}
            <Button>Logout</Button>{' '}
          </a>
        </div>
      ) : (
        <div className="navbar__button">
          <Link to="/login">
            <Button> Login </Button>
          </Link>
          <Link to="/signup">
            <Button> Sign Up </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

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
