import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import {fetchCartItems, addItemToCart} from '../store/cart'
import {fetchMenus, addMenuThunk, deleteMenuThunk} from '../store/menu'

import Cart from './Cart'
import Calendar from './Calendar'
import {editMenuThunk} from '../store/singleMenu'

class Mealplan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      items: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchItemsInReact()
    await this.props.fetchCartItemsInReact(this.props.userInReact.id)
    const orderedItems = this.props.cartInReact.map(item => {
      return item.orderedItems[0]
    })

    this.setState({
      items: orderedItems
    })

    await this.props.fetchMenus()
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  async handleAddToCart(event, item) {
    event.preventDefault()
    const userId = this.props.userInReact.id
    await this.props.addItemToCartInReact(item, userId)
    await this.props.fetchCartItemsInReact(this.props.userInReact.id)
    const orderedItems = this.props.cartInReact.map(item => {
      return item.orderedItems[0]
    })

    this.setState({
      items: orderedItems,
      searchTerm: ''
    })
  }

  render() {
    const itemsArr = this.props.itemsInReact
    return (
      <div className="app-background">
        <Calendar
          menus={this.props.menus}
          addMenu={this.props.addMenuThunk}
          editMenu={this.props.editMenuThunk}
          deleteMenu={this.props.deleteMenuThunk}
        />

        <div className="main-container">
          <form className="add-item-box">
            <input
              type="ingredeint-add"
              className="add-item-input"
              placeholder="+ Search grocery item to add"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </form>

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
                    <div className="item-search-result-box" key={item.id}>
                      <div className="item-detail">
                        <h3>{item.name}</h3>
                        <h3>${item.price / 100}/EA</h3>

                        <button
                          className="btn-add-to-list"
                          type="button"
                          onClick={event => this.handleAddToCart(event, item)}
                        >
                          ADD TO LIST
                        </button>
                      </div>
                    </div>
                  )
                })}
          </div>

          <div className="shopping-list">
            <Cart user={this.props.userInReact} cart={this.props.cartInReact} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemsInReact: state.items,
    userInReact: state.user,
    cartInReact: state.cart,
    menus: state.menus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItemsInReact: () => dispatch(fetchItems()),

    addItemToCartInReact: (item, userId) =>
      dispatch(addItemToCart(item, userId)),

    fetchCartItemsInReact: userId => dispatch(fetchCartItems(userId)),

    fetchMenus: () => dispatch(fetchMenus()),

    addMenuThunk: menu => dispatch(addMenuThunk(menu)),

    editMenuThunk: (menuId, menuToUpdate) =>
      dispatch(editMenuThunk(menuId, menuToUpdate)),

    deleteMenuThunk: menuId => dispatch(deleteMenuThunk(menuId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mealplan)
