import { combineReducers } from '@reduxjs/toolkit'

import foodApi from '@/service/foods'

const reducer = combineReducers({
  [foodApi.reducerPath]: foodApi.reducer,
})

export default reducer