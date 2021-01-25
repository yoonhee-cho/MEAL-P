import React from 'react'

const Recipes = props => {
  const recipes = props.recipes

  return (
    <div>
      {recipes &&
        recipes.map(recipe => {
          return (
            <div key={recipe.recipe_id}>
              <img src={recipe.image_url} alt={recipe.title} />
              <p>{recipe.title}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Recipes
