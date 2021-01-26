import React, {Component} from 'react'
import Form from './form'
import Recipes from './Recipes'
import {Grid} from '@material-ui/core'

const API_KEY = ''

class RecipeSearch extends Component {
  state = {
    recipes: []
  }

  getRecipe = async e => {
    e.preventDefault()
    const recipeName = e.target.elements.recipeName.value
    console.log('this.state.recipes', this.state.recipes)

    const apiCall = await fetch(
      `https://cors-anywhere.herokuapp.com/https://recipesapi.herokuapp.com/api/search?q=${recipeName}&page=3`
      // `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`
    )
    const data = await apiCall.json()
    this.setState({recipes: data.recipes})
  }

  render() {
    return (
      <div className="recipeSearch">
        <Grid container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Form getRecipe={this.getRecipe} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>

        <Grid container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Recipes recipes={this.state.recipes} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </div>
    )
  }
}

export default RecipeSearch
