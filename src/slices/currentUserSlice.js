const initialState = ''

export function setCurrentUser(user) {
    let action = {type: 'currentUser/set', payload: user}
    return action
} //WHY DOES THIS NOT WORK?

export default function currentUserReducer(state = initialState, action) {
    switch(action.type) {
        case 'currentUser/set':
            return action.payload
        default:

    }
    return state
}