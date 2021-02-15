import React from 'react'
import {fetchCartItems, updateItem, deleteItem} from '../store/cart'
import {connect} from 'react-redux'
import CartItem from './CartItem'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
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
    restItems.sort((a, b) => a.groceryitemId - b.groceryitemId)

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

  async handleToggle(event, item) {
    event.preventDefault()

    let newItems = this.state.items
    console.log('newItems', newItems)

    let toggleItem = newItems.filter(el => {
      return el[0].groceryitemId === item.id
    })

    toggleItem[0].isSelected = !toggleItem[0].isSelected
    console.log('newItemsAFTER', toggleItem)

    const userId = this.props.user.id

    await this.props.updateItem(userId, item)

    await this.props.setCartItems(userId)

    const toggledItemInCart = this.props.cart.map(item => {
      return item.orderedItems
    })

    this.setState({
      items: toggledItemInCart
    })
  }

  render() {
    const cartItems = this.props.cart

    const vegList = cartItems.filter(item => item.category === 'vegetable')
    const fruitList = cartItems.filter(item => item.category === 'fruit')
    const grainList = cartItems.filter(item => item.category === 'grain')
    const diaryList = cartItems.filter(item => item.category === 'diary')
    const seafoodList = cartItems.filter(item => item.category === 'seafood')
    const meatList = cartItems.filter(item => item.category === 'meat')
    const spiceList = cartItems.filter(item => item.category === 'spice/sauce')
    const snackList = cartItems.filter(item => item.category === 'snack')
    const etcList = cartItems.filter(item => item.category === 'etc')

    return (
      <div>
        <div className="category-container">
          <div className="category-div">
            <h3>🥦 Veggies</h3>
          </div>
          <CartItem
            cartItems={vegList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🍓 Fruit</h3>
          </div>
          <CartItem
            cartItems={fruitList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🍚 Grain</h3>
          </div>
          <CartItem
            cartItems={grainList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🧀 Diary</h3>
          </div>
          <CartItem
            cartItems={diaryList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🦐 Seafood</h3>
          </div>
          <CartItem
            cartItems={seafoodList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🥩 Meat</h3>
          </div>
          <CartItem
            cartItems={meatList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🍯 Spice/Sauce/Oil</h3>
          </div>
          <CartItem
            cartItems={spiceList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>🍩 Snack</h3>
          </div>
          <CartItem
            cartItems={snackList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
          <div className="category-div">
            <h3>✨ Etc</h3>
          </div>
          <CartItem
            cartItems={etcList}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
            handleToggle={this.handleToggle}
          />
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
