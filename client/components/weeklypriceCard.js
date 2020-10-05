import React from 'react'
import Card from '@material-ui/core/Card'
import {withStyles} from '@material-ui/core/styles'
import AddWeeklyprices from './addWeeklyprices'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Quicksand, sans-serif',
    letterSpacing: '0.1rem'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

const WeeklypirceCard = props => {
  const {classes} = props

  return (
    <Card id="addMeasurement">
      <div id="addMeasurementHeader">
        <h3>+ ADD THE AMOUNT OF MONEY YOU SPENT</h3>
      </div>
      <AddWeeklyprices classes={classes} />
    </Card>
  )
}

export default withStyles(styles)(WeeklypirceCard)
