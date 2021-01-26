import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {Button} from './Button'

const useStyles = makeStyles({
  root: {
    maxWidth: 360
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
})

const RecipeCard = props => {
  const recipe = props.recipe
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={recipe.image_url}
        title="Contemplative Reptile"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Publisher : {recipe.publisher}
        </Typography>
      </CardContent>

      <CardActions>
        <Button buttonStyle="btn--outline" buttonSize="btn--medium">
          View Recipe
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard
