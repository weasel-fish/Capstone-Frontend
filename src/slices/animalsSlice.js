const initialState = []

export default function animalsReducer(state = initialState, action) {
    switch(action.type) {
        case 'animals/set':
            return action.payload
        default:
    }
    return state
}