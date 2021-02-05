import React from 'react'
import {fetchCartItems, addItemToCart} from '../store/cart'
import {connect} from 'react-redux'

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const userId = this.props.user.id
    await this.props.getItemsInCartInReact(userId)
  }

  async handleClick(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const item = this.props.item
    await this.props.addItemToCartInReact(item, userId)
  }

  render() {
    return (
      <div className="add-to-cart">
        <button type="button" onClick={this.handleClick}>
          ADD TO CART
        </button>
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
    addItemToCartInReact: (item, userId) =>
      dispatch(addItemToCart(item, userId)),
    getItemsInCartInReact: userId => dispatch(fetchCartItems(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)
