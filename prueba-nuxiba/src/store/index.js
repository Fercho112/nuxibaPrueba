import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import postReducer from './slices/postSlice.js'
import todosReducer from './slices/todosSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts : postReducer,
        todos : todosReducer
    },
})
