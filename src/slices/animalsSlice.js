const initialState = []

export default function animalsReducer(state = initialState, action) {
    switch(action.type) {
        case 'animals/set':
            return action.payload
        case 'animals/add':
            return [...state, action.payload]
        case 'animals/remove':
            return state.filter(anim => anim.id !== action.payload)
        default:
    }
    return state
}