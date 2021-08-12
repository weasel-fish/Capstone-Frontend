const initialState = []

export default function wishesReducer(state = initialState, action) {
    switch(action.type) {
        case 'wishes/set':
            return action.payload
        default:
    }
    return state
}