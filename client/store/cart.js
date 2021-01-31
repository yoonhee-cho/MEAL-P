import {NextWeek} from '@material-ui/icons'
import axios from 'axios'

//action type
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const REMOVE_ITEMS = 'REMOVE_ITEMS'
const PURCHASE = 'PURCHASE'

//action creator

export const setCartItems = items => {
  return {
    type: SET_CART_ITEMS,
    items: items
  }
}

export const changeQuantity = items => {
  return {
    type: CHANGE_QUANTITY,
    items: items
  }
}

export const removeItems = items => {
  return {
    type: REMOVE_ITEMS,
    items: items
  }
}

export const purchase = items => {
  return {
    type: PURCHASE,
    items: items
  }
}

// thunk to get all of the user cart items
export const fetchCartItems = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`api/users/${userId}/cart`)
      dispatch(setCartItems(response.data))
    } catch (err) {
      alert('you are not an authroized to make changes to this accrount')
      console.log(err)
    }
  }
}

//thunk to update item qty
export const updateQuantity = (orderedItemId, newQuantity, userId) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `/api/users/${userId}/${orderedItemId}`,
        {quantity: newQuantity}
      )
      dispatch(changeQuantity(response.data))
    } catch (err) {
      alert('something wrong with updateQuantity thunk')
      console.log(err)
    }
  }
}

//thunk to remove item from cart
export const deleteItems = (cartId, orderedItemId, userId) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        `/api/users/${userId}/${cartId}/${orderedItemId}`
      )
      dispatch(removeItems(response.data))
    } catch (err) {
      alert('something wrong with deleteItems thunk in store/cart.js')
      console.log(err)
    }
  }
}

//thunk to purchase
export const makePurchase = (cartId, userId) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `/api/users/${userId}/${cartId}/purchase`,
        {isActive: false}
      )
      dispatch(purchase(response.data))
    } catch (err) {
      alert('something wrong with purchase thunk in store/cart.js')
      console.log(err)
    }
  }
}

//reducers, which gets sent to store.js to be combined
export default function cartReducer(state = {orderedItems: []}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items
    case CHANGE_QUANTITY:
      return {
        ...state,
        orderedItems: [...action.items.orderedItems]
      }
  }
}
