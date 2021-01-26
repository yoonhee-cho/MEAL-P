import React from 'react'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

const Form = props => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <form className="form-container" onSubmit={props.getRecipe}>
          {/* <input className="form-input" type="text" name="recipeName" /> */}
          <TextField
            id="outlined-search"
            label="Search Ingredients"
            type="text"
            variant="outlined"
            name="recipeName"
            className="form-input"
          />

          <button className="btn-search" type="submit">
            {' '}
            Get Recipes !{' '}
          </button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Form
