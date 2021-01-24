import React from 'react'
import {StyledBurger} from './Burger.styled.js'

const Burger = props => {
  const open = props.open
  const setOpen = props.setOpen

  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <span />
      <span />
      <span />
    </StyledBurger>
  )
}

export default Burger
