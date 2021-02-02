import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import {add} from '../store/user'
import {fetchCartItems} from '../store/cart'

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

  handleAddToCart(event) {
    const itemsArr = this.props.itemsInReact

    const itemToAdd =
      itemsArr &&
      itemsArr.filter(item => {
        return item.name.toLowerCase() === this.state.searchTerm.toLowerCase()
      })

    console.log(itemToAdd, 'itemToAdd')
  }

  render() {
    // const itemsArr = this.props.itemsInReact
    // const itemToAdd =
    //   itemsArr &&
    //   itemsArr.filter(item => {
    //     return item.name.toLowerCase() === this.state.searchTerm.toLowerCase()
    //   })

    // console.log('item???', itemToAdd)

    return (
      <>
        <div className="add-to-list">
          <form className="input-form">
            <input
              type="ingredeint-add"
              className="text-input"
              placeholder="+ Add new Item"
              value={this.state.sea}
              onChange={this.handleChange}
            />

            <select label="Quantity: ">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <button type="submit" onClick={this.handleAddToCart}>
              add
            </button>
          </form>
        </div>

        <div className="shopping-list">
          <div>
            {/* {itemToAdd.map(item => {
              return item.name
            })
            } */}
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
