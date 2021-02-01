import axios from 'axios'

//action type
const SET_ITEM = 'SET_ITEM'

//action creator
export const setItem = item => {
  return {
    type: SET_ITEM,
    item: item
  }
}

//thunk
export const fetchItem = itemId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/groceryItems/${itemId}`)
      dispatch(setItem(response.data))
    } catch (error) {
      console.log('there is something wrong in the updateItem thunk', error)
    }
  }
}

export const updateItem = updatedItem => {
  return async dispatch => {
    try {
      await axios.put(`/api/groceryItems/${updatedItem.id}`, updatedItem)
      dispatch({updateItem})
    } catch (error) {
      console.log('there is something wrong with updateItem thunk', error)
    }
  }
}

export const deleteItem = itemId => {
  return async dispatch => {
    await axios.delete(`/api/gorceryItems/${itemId}`)
    dispatch(setItem({}))
  }
}

const initialState = {
  item: {}
}

export default function singleItemReducer(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_ITEM:
      return {...state, item: action.item}
    default:
      return state
  }
}
