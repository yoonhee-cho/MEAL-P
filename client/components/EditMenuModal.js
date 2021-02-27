import React from 'react'

class EditMenuModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit(event) {
    event.preventDefault()
    const menuId = this.props.menu.id
    const menuToEdit = {
      name: this.state.name,
      category: this.state.category
    }
    this.props.editMenu(menuId, menuToEdit)
    this.props.handleToggleModal()
  }

  handleDelete(event) {
    event.preventDefault()
    const menuId = this.props.menu.id
    this.props.deleteMenu(menuId)
    this.props.handleToggleModal()
  }

  render() {
    console.log('m??enu', this.props.menu)

    return (
      <>
        {this.props.show ? (
          <div className="modal" onClick={() => this.props.handleToggleModal()}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h4 className="modal-title">EDIT/DELETE MENU</h4>
                <i
                  className="fas fa-times"
                  onClick={() => this.props.handleToggleModal()}
                />
              </div>

              <div className="modal-body">
                <form className="add-menu-form" onSubmit={this.handleEdit}>
                  <label>
                    Menu Name :
                    <input
                      required
                      className="add-menu-form-input"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      defaultValue={this.props.menu.name}
                    />
                  </label>

                  <label>
                    Category :
                    <select
                      name="category"
                      onChange={this.handleChange}
                      defaultValue={this.props.menu.category}
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

                  <button type="submit">Edit</button>
                </form>
                <button
                  type="submit"
                  onClick={event => {
                    this.handleDelete(event)
                  }}
                >
                  Delete
                </button>
              </div>

              <div className="modal-footer" />
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
export default EditMenuModal
