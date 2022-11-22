import { configureStore } from '@reduxjs/toolkit'
import kanbanReducer from './reducers'

export default configureStore({
  reducer: {
    kanban: kanbanReducer
  }
})