const initialState = []

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case 'users/set':
            return action.payload
        case 'users/add':
            return [...state, action.payload]
        default:
    }
    return state
}