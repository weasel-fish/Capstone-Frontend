import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import WishList from './WishList'
import OutingsList from './OutingsList'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'


const GridParent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    justify-items: center;
    width: 70%;
    margin: 30px auto 30px auto;
`
const LeftColumn = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`
const RightColumn = styled.div`
    grid-area: 1 / 2 / 2 / 3;
`

const Head = styled.div`
    text-align: center;
    margin-bottom: 50px;
`

const Button = styled.button`
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
`

function UserPage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    
    const currentUser = useSelector(state => state.currentUser)
    const params = useParams()
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
                <Head>
                    <h1>{user.username}'s Page</h1>
                    <img src={`http://localhost:3000${user.avatar}`} alt='user pic'/>
                    <br></br>
                    {self ? null : following ? <Button onClick={() => handleUnfollow()}>Unfollow</Button>:<Button onClick={() => handleFollow()}>Follow</Button>}
                </Head>
                <GridParent>
                    <LeftColumn>
                        <WishList user={user} />
                    </LeftColumn>
                    <RightColumn>
                        <OutingsList user={user} />
                        <FollowersList user={user} followers={followers} />
                        <FollowingList user={user} />
                    </RightColumn>
                </GridParent>
                {/* <GrandFlex>
                    <WishList user={user} />
                    <ParentFlex>
                        <FlexChild>
                        <OutingsList user={user} />
                        </FlexChild>
                        <FlexChild>
                        <FollowersList user={user} followers={followers} />
                        </FlexChild>
                        <FlexChild>
                        <FollowingList user={user} />
                        </FlexChild>
                    </ParentFlex>
                </GrandFlex> */}
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