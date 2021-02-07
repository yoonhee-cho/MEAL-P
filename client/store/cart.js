import axios from 'axios'

//action type
const SET_CART = 'SET_CART'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_CART = 'UPDATE_CART'

const REMOVE_ITEM = 'REMOVE_ITEM'

//action creator
export const setCart = cart => {
  return {
    type: SET_CART,
    cart: cart
  }
}

export const updateCart = items => {
  return {
    type: UPDATE_CART,
    items: items
  }
}

export const removeItem = items => {
  return {
    type: REMOVE_ITEM,
    items: items
  }
}

export const fetchCartItems = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}/cart`)
      dispatch(setCart(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToCart = (itemObj, userId) => {
  return async dispatch => {
    try {
      await axios.post(`/api/users/${userId}/cart`, itemObj)
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateItem = (userId, item) => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}/cart`, item)
      const response = await axios.get(`/api/users/${userId}/cart`)
      dispatch(updateCart(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk to remove item from cart
export const deleteItem = (userId, itemObj) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}/cart`, {data: itemObj})
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(setCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//thunk to purchase
// export const makePurchase = (cartId, userId) => {
//   return async dispatch => {
//     try {
//       const response = await axios.put(
//         `/api/users/${userId}/${cartId}/purchase`,
//         {isActive: false}
//       )
//       dispatch(purchase(response.data))
//     } catch (err) {
//       alert('something wrong with purchase thunk in store/cart.js')
//       console.log(err)
//     }
//   }
// }

const initialState = []

//reducers, which gets sent to store.js to be combined
export default function cartReducer(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CART:
      return action.cart

    case ADD_ITEM:
      return [...state, action.item]

    case UPDATE_CART:
      return action.items

    default:
      return state
  }
}
