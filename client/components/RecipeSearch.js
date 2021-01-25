import React, {Component} from 'react'
import Form from './form'
import Recipes from './Recipes'

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
      <div className="RecipeSearch">
        <header className="RecipeSearch-header">
          <h1 className="RecipeSearch-title">Recipe Search</h1>
        </header>

        <Form getRecipe={this.getRecipe} />

        <Recipes recipes={this.state.recipes} />
      </div>
    )
  }
}

export default RecipeSearch
