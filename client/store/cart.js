import axios from 'axios'

//action type
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const CHANGE_ITEM_QTY = 'CHANGE_ITEM_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'

//action creator
export const setCartItems = items => {
  return {
    type: SET_CART_ITEMS,
    items: items
  }
}

export const changeItemQty = items => {
  return {
    type: CHANGE_ITEM_QTY,
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
      dispatch(setCartItems(response.data))
    } catch (err) {
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
      dispatch(changeItemQty(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

//thunk to remove item from cart
export const deleteItems = (userId, cartId, orderedItemId) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        `/api/users/${userId}/${cartId}/${orderedItemId}`
      )
      dispatch(removeItem(response.data))
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

//reducers, which gets sent to store.js to be combined
export default function cartReducer(state = {orderedItems: []}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items

    case CHANGE_ITEM_QTY:
      return {
        ...state,
        orderedItems: [...action.items]
      }

    case REMOVE_ITEM:
      return {
        ...state,
        orderedItems: [...action.items]
      }

    default:
      return state
  }
}
