import React from 'react'
import RecipeCard from './RecipeCard'
import {Grid} from '@material-ui/core'

const Recipes = props => {
  const recipes = props.recipes

  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map(recipe => {
          return (
            <Grid item xs={12} sm={4} key={recipe.mealId}>
              <RecipeCard recipe={recipe} />
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Recipes
