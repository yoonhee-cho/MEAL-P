import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({open}) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }
`

const RightNav = props => {
  const userId = props.userId
  const open = props.open
  return (
    <Ul open={open} className="navbar__menu">
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
    </Ul>
  )
}

export default RightNav
