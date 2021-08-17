const initialState = ''

export function setCurrentUser(user) {
    let action = {type: 'currentUser/set', payload: user}
    return action
} //WHY DOES THIS NOT WORK?

export default function currentUserReducer(state = initialState, action) {
    switch(action.type) {
        case 'currentUser/set':
            return action.payload
        // case 'currentUser/setAvatar':
        //     return {...state, avatar: action.payload}
        case 'currentUser/addFollowee':
            return {...state, followees: [...state.followees, action.payload]}
        case 'currentUser/removeFollowee':
            return {...state, followees: state.followees.filter(fol => fol.id !== action.payload)}
        case 'currentUser/addOuting':
            return {...state, outings: [...state.outings, action.payload]}
        case 'currentUser/removeOuting':
            return {...state, outings: state.outings.filter(out => out.id !== action.payload)}
        case 'currentUser/addWish':
            return {...state, wishes: [...state.wishes, action.payload]}
        case 'currentUser/removeWish':
            return {...state, wishes: state.wishes.filter(wish => wish.id !== action.payload)}
        case 'currentUser/removeAlert':
            return {...state, alerts: state.alerts.filter(alert => alert.id !== action.payload)}
        default:

    }
    return state
}