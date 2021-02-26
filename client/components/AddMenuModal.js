import React from 'react'

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null
    } else {
      return (
        <div className="modal" id="modal">
          <h2>Modal Window</h2>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus
            non fuga omnis a sed impedit explicabo accusantium nihil doloremque
            consequuntur.
          </div>
          <div className="actions">
            <button
              type="submit"
              className="toggle-button"
              onClick={() => this.props.handleToggleModal()}
            >
              OK
            </button>
          </div>
        </div>
      )
    }
  }
}
