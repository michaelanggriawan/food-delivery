import {
    type AnyAction,
    configureStore,
    type ThunkDispatch,
  } from '@reduxjs/toolkit'
  
  import foodApi from '@/service/foods'
  
  import reducer from './reducer'
  
  export const configureAppStore = (preloadedState?: TypedObject) => {
    const store = configureStore({
      reducer,
      devTools: true,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(foodApi.middleware),
      preloadedState,
    })
  
    return store
  }
  
  const store = configureAppStore()
  
  export type AppStore = typeof store
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch'] &
    ThunkDispatch<RootState, void, AnyAction>
  
  export default store