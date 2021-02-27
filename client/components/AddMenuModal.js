import React from 'react'

class AddMenuModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const menu = {
      name: this.state.name,
      category: this.state.category,
      createdAt: this.props.date
    }
    this.props.addMenu(menu)
    this.props.handleToggleModal()
  }

  render() {
    console.log('menuToAdd', this.props.menu)
    return (
      <>
        {this.props.show ? (
          <div className="modal" onClick={() => this.props.handleToggleModal()}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h4 className="modal-title">ADD MENU</h4>
                <i
                  className="fas fa-times"
                  onClick={() => this.props.handleToggleModal()}
                />
              </div>

              <div className="modal-body">
                <form className="add-menu-form" onSubmit={this.handleSubmit}>
                  <label>
                    Menu Name :
                    <input
                      required
                      className="add-menu-form-input"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={event => this.handleChange(event)}
                    />
                  </label>

                  <label>
                    Category :
                    <select
                      name="category"
                      onChange={event => this.handleChange(event)}
                      className="add-menu-form-input"
                    >
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

                  <button type="submit" value="Submit" className="add-menu-btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
export default AddMenuModal
