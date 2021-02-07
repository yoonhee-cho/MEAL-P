import React from 'react'
import {fetchCartItems, updateItem, deleteItem} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }

    this.handleQuantity = this.handleQuantity.bind(this)
    // this.handleRemove = this.handleRemove.bind(this)
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

  handleQuantity(itemId) {
    console.log(itemId, 'hello???')
  }

  // handleRemove(item, event){
  //     event.preventDefault()
  //     const userId = this.props.user.id
  //     this.props.deleteItem(userId, item)
  // }

  render() {
    const items = this.props.cart
    return (
      <div>
        <div>
          <h3>Grocery Shopping List</h3>
        </div>

        <div>
          {items &&
            items.map(item => {
              return (
                <div key={item.id}>
                  <div>{item.name}</div>

                  <div>{item.price / 100}</div>

                  <button
                    type="button"
                    className="adjust-qty"
                    onClick={this.handleQuantity.bind(this, item.id)}
                  >
                    -
                  </button>

                  <button
                    type="button"
                    className="adjust-qty"
                    onClick={this.handleQuantity.bind(this, item.id)}
                  >
                    +
                  </button>

                  <div>price:</div>

                  <div className="remove-button-container">
                    <button
                      type="button"
                      className="remove-from-cart-button"
                      // onClick={this.handleRemove(item)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
