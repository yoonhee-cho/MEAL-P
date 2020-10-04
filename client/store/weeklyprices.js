import axios from 'axios'
import history from '../history'

//ACTION TYPES//
const GOT_DATA_FROM_SERVER = 'GOT_DATA_FROM_SERVER'
const GOT_NEW_DATA_FROM_SERVER = 'GOT_NEW_DATA_FROM_SERVER'

//INITIAL STATE//
const initialState = []

//ACTION CREATORS//
export const gotData = weeklyprices => ({
  type: GOT_DATA_FROM_SERVER,
  weeklyprices // an array of weeklyprices objects
})

export const gotNewData = weeklyprice => ({
  type: GOT_NEW_DATA_FROM_SERVER,
  weeklyprice // a signle object
})

//THUNK CREATORS//
export function fetchWeeklyprices(userId) {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/weeklyprices/${userId}`)
      dispatch(gotData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function postWeeklyprice(weeklyprice, userId) {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/weeklyprices/${userId}`, weeklyprice)
      dispatch(gotNewData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER//
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_DATA_FROM_SERVER:
      return [...state, ...action.weeklyprices]
    case GOT_NEW_DATA_FROM_SERVER:
      return [...state, ...action.weeklyprice]
    default:
      return state
  }
}
