import axios from 'axios'

//action type
const ADD_TO_CART = 'ADD_TO_CART'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const UPDATE_ITEM = 'UPDATE_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

//action creator

export const addToCart = item => {
  return {
    type: ADD_TO_CART,
    item: item
  }
}

export const setCartItems = items => {
  return {
    type: SET_CART_ITEMS,
    items: items
  }
}

export const updateItem = item => {
  return {
    type: UPDATE_ITEM,
    items: item
  }
}

export const removeItem = itemId => {
  return {
    type: REMOVE_ITEM,
    itemId: itemId
  }
}

export const addItemToCart = (itemObj, userId) => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/users/${userId}/cart`, itemObj)
      dispatch(addToCart(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

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
      dispatch(updateItem(response.data))
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
      dispatch(removeItem(response.data))
    } catch (err) {
      alert('something wrong with deleteItems thunk in store/cart.js')
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
    case ADD_TO_CART:
      return [...state, action.item]

    case SET_CART_ITEMS:
      return action.items

    case UPDATE_ITEM:
      return state.map(item => {
        if (item.id === action.item.itemId) {
          item.quantity = action.item.quantity
        }
        return item
      })

    case REMOVE_ITEM:
      return state.filter(item => {
        if (item.id !== action.itemId) return item
      })

    default:
      return state
  }
}
