import axios from 'axios'
import {fetchMenus} from './menu'
// const SET_MENU = 'SET_MENU'
const EDIT_MENU = 'EDIT_MENU'

// const setMenu = menu => {
//   return {
//     type: SET_MENU,
//     menu: menu
//   }
// }

const editMenu = menu => {
  return {
    type: EDIT_MENU,
    menu: menu
  }
}

// export const fetchMenu = id => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/menu/${id}`)
//     dispatch(setMenu(data))
//   } catch (error) {
//     console.log('error in the fetchMenu', error)
//   }
// }

export const editMenuThunk = (id, updatedMenu) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/menus/${id}`, updatedMenu)
    dispatch(editMenu(data))
    dispatch(fetchMenus())
  } catch (error) {
    console.log('error in the editMenu Thunk', error)
  }
}

export default function singleMenuReducer(state = {}, action) {
  switch (action.type) {
    // case SET_MENU:
    //   return action.menu
    case EDIT_MENU:
      return action.menu
    default:
      return state
  }
}
