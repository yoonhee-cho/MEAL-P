import React from 'react'

class AddMenuForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const menu = this.state
    this.props.addMenu(menu)
  }

  render() {
    return (
      <>
        <form className="add-menu-form" onSubmit={this.handleSubmit}>
          <label>
            Menu Name :
            <input
              required
              className="add-menu-form-input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Category :
            <select name="category" onChange={this.handleChange}>
              <option name="category" value="" />
              <option name="category" value="breakfast">
                Breakfast
              </option>
              <option name="category" value="lunch">
                Lunch
              </option>
              <option name="category" value="dinner">
                Dinner
              </option>
              <option name="category" value="snack">
                Snack
              </option>
            </select>
          </label>

          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </>
    )
  }
}

export default AddMenuForm
