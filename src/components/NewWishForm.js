import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import NewAnimalForm from './NewAnimalForm'
import styled from 'styled-components'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    flex-wrap: wrap;
    
    height: 250px;

    & input[type=select] {
    }

    & input[type=submit] {
        align-self: center;
        padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
        margin: 5px 0px 5px 0px;
    }
`
const Error = styled.p`
    color: red;
    font-weight: 700;
`

function NewWishForm({setDisplayForm}) {
    const [dropdown, setDropdown] = useState('generate')
    const [formData, setFormData] = useState({common_name: '', scientific_name: '', description: ''})
    const animals = useSelector(state => state.animals)
    const currentUser = useSelector(state => state.currentUser)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    function handleDropChange(e) {
        setDropdown(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        if(dropdown === 'generate') {
            let resp = await fetch('/wishlist/with-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...formData, user_id: currentUser.id})
            })

            if(resp.ok) {
                resp.json().then(data => {
                    dispatch({type: 'currentUser/addWish', payload: data.wish})
                    dispatch({type: 'animals/add', payload: data.animal})
                    setDisplayForm(false)
                })
            } else {
                resp.json().then(data => setErrors(data.errors))
            }

        } else {
            let resp = await fetch('/wish_list_animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    animal_id: dropdown,
                    user_id: currentUser.id
                })
            })

            if(resp.ok) {
                resp.json().then(wish => {
                    dispatch({type: 'currentUser/addWish', payload: wish})
                    setDisplayForm(false)
                })
            } else {
                resp.json().then(data => setErrors(data.errors))
            }
        }
        
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <label>Pick a tracked animal or generate new information: 
                <select onChange={handleDropChange} name='animal'>
                    <option value='generate'>Generate new</option>
                    {animals.map(anim => <option key={anim.id} value={anim.id}>{anim.common_name}</option>)}
                </select></label>
                {dropdown === 'generate' ? <NewAnimalForm animForm={formData} handleAnimChange={handleChange}/> : null}
                <input type='submit'></input>
            </StyledForm>
            {errors ? errors.map(error => <Error key={error}>{error}</Error>) : null}
        </>
    )
}

export default NewWishForm