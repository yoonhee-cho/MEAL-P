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
            <input className="quantity" type="number" min="1" />
            <button type="submit">add</button>
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
