import axios from 'axios'

//action type
const SET_ITEMS = 'SET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

//action creator
const setItems = items => {
  return {
    type: SET_ITEMS,
    items: items
  }
}

const addItem = item => {
  return {
    type: ADD_ITEM,
    item: item
  }
}

//thunk to get all of items
export const fetchItems = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api//groceryItems')
      dispatch(setItems(response.data))
    } catch (error) {
      console.log('error in the fetchItems thunk', error)
    }
  }
}

//thunk to add item to db
export const addItemToDb = item => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/groceryItems', item)
      dispatch(addItem(response.data))
    } catch (error) {
      console.log('error in the addItemToDb thunk', error)
    }
  }
}

//thunk to delete item from db
export const deleteItemFromDb = itemId => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`/api/items/${itemId}`)
      dispatch({
        type: DELETE_ITEM,
        id: itemId,
        state: getState
      })
    } catch (error) {
      console.log('error in the deleteItemFromDb thunk', error)
    }
  }
}

//reducers - respobsible to update state in store
export default function itemReducer(state = [], action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_ITEMS:
      return action.items

    case ADD_ITEM:
      return [
        ...state,
        {
          name: action.item.name,
          id: action.item.id
        }
      ]

    case DELETE_ITEM:
      return [
        ...state.filter(item => {
          return item.id !== action.id
        })
      ]
    default:
      return state
  }
}
