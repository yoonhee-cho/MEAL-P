import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import itemReducer from './item'
import singleItemReducer from './singleItem'
import cartReducer from './cart'

const reducer = combineReducers({
  user,
  items: itemReducer,
  item: singleItemReducer,
  cart: cartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
