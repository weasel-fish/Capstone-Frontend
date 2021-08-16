import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import WishList from './WishList'
import OutingsList from './OutingsList'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import { useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom'

function UserPage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    
    const currentUser = useSelector(state => state.currentUser)
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const self = currentUser.id === user.id
    const following = currentUser.followees.some(fol => fol.id === user.id)
    const [followers, setFollowers] = useState([])

    
    useEffect(() => {
        
        // if(params.id == currentUser.id) {
        //     history.push('/user-home')
        // } else {
            fetch(`/users/${params.id}`)
            .then(resp => resp.json())
            .then(user => {
                setUser(user)
                setFollowers(user.followers)
                setLoading(false)
            })
        // }
    }, []) //Should handle User Not Found

    async function handleFollow() {
        
        let resp = await fetch('/follows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                follower_id: currentUser.id,
                followee_id: user.id
            })
        })

        if(resp.ok){
            resp.json().then(() => {
                dispatch({type: 'currentUser/addFollowee', payload: user})
                let newFollowers = [...followers, currentUser]
                setFollowers(newFollowers)
            })
        } else {
           resp.json().then(console.log)
        }
    }

    async function handleUnfollow() {
        let resp = await fetch(`/follows/${currentUser.id}/${user.id}`, {method: 'DELETE'})

        if(resp.ok) {
            // resp.json().then(() => {
                dispatch({type: 'currentUser/removeFollowee', payload: user.id})
                let newFollowers = followers.filter(fol => fol.id !== currentUser.id)
                setFollowers(newFollowers)
            // })
        } else {
            resp.json().then(console.log)
        }
    }
    
    function generateUserInfo(user) {
        return (
            <>
                <h1>{user.username}'s Page</h1>
                {self ? null : following ? <button onClick={() => handleUnfollow()}>Unfollow</button>:<button onClick={() => handleFollow()}>Follow</button>}
                <WishList user={user} />
                <OutingsList user={user} />
                <FollowersList user={user} followers={followers} />
                <FollowingList user={user} />
            </>
        )
    }
    
    return (
        <>
           {loading ? <p>Loading...</p> : generateUserInfo(user)}
        </>
    )
}

export default UserPage