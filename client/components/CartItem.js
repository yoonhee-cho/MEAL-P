import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'

const CartItem = props => {
  return (
    <div className="item-list">
      {props.cartItems &&
        props.cartItems.map(item => {
          return (
            <div key={item.id} className="item-container">
              <div
                className="item-name"
                onClick={event => props.handleToggle(event, item)}
              >
                {item.orderedItems[0].isSelected ? (
                  <div className="togglebox">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.name}</span>
                  </div>
                ) : (
                  <div className="togglebox">
                    <FontAwesomeIcon icon={faCircle} />
                    <span className="incompleted">{item.name}</span>
                  </div>
                )}
              </div>

              <select
                id={item.id}
                label="Quantity"
                defaultValue={item.orderedItems[0].quantity}
                onChange={event => props.handleChange(event, item)}
              >
                {Array.from(Array(15)).map((el, idx) => {
                  return (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  )
                })}
              </select>

              <div> $ {item.orderedItems[0].subTotal / 100}</div>

              <div className="remove-button-container">
                <i
                  className="fas fa-trash-alt"
                  onClick={event => props.handleRemove(event, item)}
                />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CartItem
