import React from 'react'
import {fetchCartItems, updateItem, deleteItem} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async componentDidMount() {
    const userId = this.props.user.id

    await this.props.setCartItems(userId)

    const orderedItems = this.props.cart.map(item => {
      return item.orderedItems
    })

    this.setState({
      items: orderedItems
    })
  }

  async handleChange(event, item) {
    event.preventDefault()

    let index = 0

    this.state.items.map((el, idx) => {
      if (el[0].groceryitemId === item.id) {
        index = idx
      }
    })

    const itemToUpdate = this.state.items[index]
    const restItems = this.state.items.slice()
    restItems.splice(index, 1)

    itemToUpdate[0].quantity = Number(event.target.value)

    restItems.push(itemToUpdate)
    // restItems.sort((a, b) => a.groceryitemId - b.groceryitemId)

    this.setState({
      items: restItems
    })

    const userId = this.props.user.id

    await this.props.updateItem(userId, item)

    await this.props.setCartItems(userId)

    const quantityInCart = this.props.cart.map(item => {
      return item.orderedItems
    })

    this.setState({
      items: quantityInCart
    })
  }

  async handleRemove(event, item) {
    event.preventDefault()
    const userId = this.props.user.id
    await this.props.deleteItem(userId, item)
  }

  render() {
    const cartItems = this.props.cart

    return (
      <div>
        <div>
          <div>
            <h3>Grocery Shopping List</h3>
          </div>

          <div className="item-list">
            {cartItems &&
              cartItems.map(item => {
                return (
                  <div key={item.id} className="item-container">
                    <div>{item.name}</div>

                    <select
                      id={item.id}
                      label="Quantity"
                      defaultValue={item.orderedItems[0].quantity}
                      onChange={event => this.handleChange(event, item)}
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
                      <button
                        type="button"
                        className="remove-from-cart-button"
                        onClick={event => this.handleRemove(event, item)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="total">
          <h3>
            Estimated Price : ${this.props.cart
              .reduce((accum, item) => {
                accum += item.orderedItems[0].subTotal / 100
                return accum
              }, 0)
              .toFixed(2)}
          </h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCartItems: userId => dispatch(fetchCartItems(userId)),
    updateItem: (userId, itemObj) => dispatch(updateItem(userId, itemObj)),
    deleteItem: (userId, itemObj) => dispatch(deleteItem(userId, itemObj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
