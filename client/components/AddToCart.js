import React from 'react'

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleAddToCart(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const item = this.props.item
    await this.props.addToCart(item, userId)
  }

  render() {
    console.log('is passed?', this.props.addToCart)
    return (
      <div className="add-to-cart">
        <button type="button" onClick={this.handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    )
  }
}

export default AddToCart
