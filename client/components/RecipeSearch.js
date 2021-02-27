import React, {Component} from 'react'
import Form from './Form'
import Recipes from './Recipes'
import {Grid} from '@material-ui/core'

class RecipeSearch extends Component {
  state = {
    recipes: []
  }

  getRecipe = async e => {
    e.preventDefault()
    const recipeName = e.target.elements.recipeName.value

    const apiCall = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
    )
    const data = await apiCall.json()
    this.setState({recipes: data.meals})
  }

  render() {
    console.log('recipe', this.state.recipes)
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
