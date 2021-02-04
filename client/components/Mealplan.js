import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import {add} from '../store/user'
import {fetchCartItems} from '../store/cart'
import ItemCard from './ItemCard'

class Mealplan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddToCart = this.handleAddToCart(this)
  }

  async componentDidMount() {
    await this.props.getItemsInReact()
    await this.props.fetchCartItemsInReact(this.props.userInReact.id)
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  handleAddToCart() {}

  render() {
    const itemsArr = this.props.itemsInReact

    return (
      <>
        <div className="add-to-list">
          <form className="input-form">
            <input
              type="ingredeint-add"
              className="text-input"
              placeholder="+ Search grocery item to add"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </form>
        </div>

        <div className="shopping-list">
          <div>
            {itemsArr &&
              itemsArr
                .filter(item => {
                  return (
                    item.name.toLowerCase() ===
                    this.state.searchTerm.toLowerCase()
                  )
                })
                .map(item => {
                  return (
                    <ItemCard
                      key={item.id}
                      userId={this.props.userInReact.id}
                      itemName={item.name}
                      itemPrice={item.price}
                      handleAddToCart={this.handleAddToCart}
                    />
                  )
                })}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemsInReact: state.items,
    userInReact: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItemsInReact: () => dispatch(fetchItems()),
    addItemToCartInReact: (userId, itemId) => dispatch(add(userId, itemId)),
    fetchCartItemsInReact: userId => dispatch(fetchCartItems(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mealplan)
