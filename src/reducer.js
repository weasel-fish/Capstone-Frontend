import { combineReducers } from "redux"
import currentUserReducer from './slices/currentUserSlice'
import usersReducer from './slices/usersSlice'
import wishesReducer from './slices/wishesSlice'
import animalsReducer from './slices/animalsSlice'

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    animals: animalsReducer,
    wishes: wishesReducer
})

export default rootReducer