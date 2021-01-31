import React from 'react'
import Button from './Button'

class Mealplan extends React.Component {
  render() {
    return (
      <>
        <div className="add-to-list">
          <form className="input-form">
            <input
              type="ingredeint-add"
              className="text-input"
              placeholder="+ Add new Item"
            />
            <select className="catecory-select">
              <option>-Select-</option>
              <option>🥦 Veggies</option>
              <option>🥩 Meat</option>
              <option>🐟 Fish</option>
              <option>🥛 Dairy</option>
              <option>🍓 Fruit</option>
              <option>🥖 Bakery</option>
              <option>🍰 Dessert</option>
              <option>🍯 Sauce / 🧂 Spice</option>
              <option>💫 etc</option>
            </select>
            <select label="Quantity: ">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            {/* <input className="quantity" type="number" min="1" /> */}
            <button
              type="button"
              onClick={event => this.handleAddToCart(event, item)}
            >
              add
            </button>
          </form>
        </div>
        <div className="shopping-list">
          <li>blueberry</li>
        </div>
      </>
    )
  }
}

export default Mealplan
