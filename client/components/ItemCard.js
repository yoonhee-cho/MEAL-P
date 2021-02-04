import React from 'react'
import {Button} from './Button'

const ItemCard = props => {
  return (
    <div>
      {props.userId}
      {props.itemName}
      {props.itemPrice}

      <Button> ADD TO CART </Button>
    </div>
  )
}

export default ItemCard
