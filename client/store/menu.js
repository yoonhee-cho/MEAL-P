import axios from 'axios'

const SET_MENUS = 'SET_MENUS'
const ADD_MENU = 'ADD_MENU'
const DELETE_MENU = 'DELETE_MENU'

const setMenus = menus => {
  return {
    type: SET_MENUS,
    menus: menus
  }
}

const addMenu = menu => {
  return {
    type: ADD_MENU,
    menu: menu
  }
}

const deleteMenu = id => {
  return {
    type: DELETE_MENU,
    id: id
  }
}

export const fetchMenus = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/menus')
    dispatch(setMenus(data))
  } catch (error) {
    console.log('error in the fetchMenus thunk', error)
  }
}

export const addMenuThunk = menu => async dispatch => {
  try {
    const {data} = await axios.post('/api/menus', menu)
    dispatch(addMenu(data))
    dispatch(fetchMenus())
  } catch (error) {
    console.log('error in the addMenuThunk', error)
  }
}

export const deleteMenuThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/menus/${id}`)
    dispatch(deleteMenu(id))
    dispatch(fetchMenus())
  } catch (error) {
    console.log('error in the deleteMenuThunk', error)
  }
}

const products = []

export default function menusReducer(state = products, action) {
  switch (action.type) {
    case SET_MENUS:
      return [...action.menus]
    case ADD_MENU:
      return [...state, action.menu]
    case DELETE_MENU:
      return state.filter(menu => menu.id !== action.id)
    default:
      return state
  }
}
