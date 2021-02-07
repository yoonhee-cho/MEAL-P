import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import AddToCart from './AddToCart'
import Cart from './Cart'

class Mealplan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getItemsInReact()
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

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
                    <div key={item.id} className="item-preview-text">
                      <h3>{item.name}</h3>
                      <h3>{item.price / 100}</h3>
                      <AddToCart item={item} />
                    </div>
                  )
                })}
          </div>

          <div>
            <Cart />
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
    getItemsInReact: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mealplan)
