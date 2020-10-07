import React, {Component} from 'react'
import Form from './form'

const API_KEY = ''

class RecipeSearch extends Component {
  getRecipe = async e => {
    e.preventDefault()
    const recipeName = e.target.elements.recipeName.value
    const apiCall = await fetch(
      `https://cors-anywhere.herokuapp.com/https://recipesapi.herokuapp.com/api/search?q=chicken&page=3`
    )
    const data = await apiCall.json()
    console.log('data', data)
  }
  //instead of using (this is kinda decrecated in react 16)
  // constructor(){
  //this.getRecipe = this.getRecipe.bind()
  // }//
  //you can even declare state without constructor function

  render() {
    return (
      <div className="RecipeSearch">
        <header className="RecipeSearch-header">
          <h1 className="RecipeSearch-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
      </div>
    )
  }
}

export default RecipeSearch
