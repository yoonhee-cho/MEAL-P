import axios from 'axios'
import {fetchMenus} from './menu'

const EDIT_MENU = 'EDIT_MENU'

const editMenu = menu => {
  return {
    type: EDIT_MENU,
    menu: menu
  }
}

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
    case EDIT_MENU:
      return action.menu

    default:
      return state
  }
}
