import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Input from '@material-ui/core/Input'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Select from '@material-ui/core/Select'
import {withStyles} from '@material-ui/core/styles'
import {postWeeklyprice} from '../store/weeklyprices'
import {connect} from 'react-redux'

class AddWeeklyprices extends Component {
  constructor() {
    super()
    this.state = {
      category: '',
      data: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    // const userId = this.props.user.id
    console.log('this.props', this.props)
    let newWeeklyPrice = {
      category: this.state.category,
      data: this.state.data
    }
    // this.props.postWeeklyprice(newWeeklyPrice, userId)
  }

  render() {
    const {classes} = this.props

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <CardContent>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="type">Place</InputLabel>
            <Select
              value={this.state.category}
              onChange={this.handleChange}
              name="category"
            >
              <MenuItem value="Trader Joes">Trader Joe's</MenuItem>
              <MenuItem value="H Mart">H Mart</MenuItem>
              <MenuItem value="Whole Foods Market">Whole Foods Market</MenuItem>
              <MenuItem value="Total">Total</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="data">Enter amount</InputLabel>
            <Input name="data" id="data" onChange={this.handleChange} />
          </FormControl>
        </CardContent>

        <CardActions>
          <Button id="addMeasurementSubmit" type="submit" fullWidth>
            SUBMIT
          </Button>
        </CardActions>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  weeklyprice: state.weeklyprice
})

const mapDispatchToProps = dispatch => {
  return {
    postWeeklyprice: weeklyprice =>
      dispatch(postWeeklyprice(weeklyprice, userId))
  }
}

const ConnectedAddWeeklyprices = connect(mapStateToProps, mapDispatchToProps)(
  AddWeeklyprices
)
export default ConnectedAddWeeklyprices
