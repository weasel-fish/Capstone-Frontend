import { combineReducers } from "redux"
import currentUserReducer from './slices/currentUserSlice'

const rootReducer = combineReducers({currentUser: currentUserReducer})

export default rootReducer