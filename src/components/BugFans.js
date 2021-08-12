import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import UserCard from "./UserCard"

function BugFans() {
    const users = useSelector(state => state.users)
    const currentUser = useSelector(state => state.currentUser)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    // useEffect(() => { //Instead of fetching every time on page load, maybe store it in Redux state?
    //     if(users.length > 0) {
    //         setLoading(false)
    //     } else {
    //         fetch('/users')
    //         .then(resp => resp.json())
    //         .then(users => {
    //             dispatch({type: 'users/set', payload: users})
    //             setLoading(false)
    //         })
    //     }
    // }, [])

    return (
        <>
            <h1>Bug Fans Like You!</h1>
            {!loading ? 'Loading...' : users.map(user => {
                if(user.username !== currentUser.username) {
                    return <UserCard key={user.id} user={user} />
                }
            })}
        </>
    )
}

export default BugFans