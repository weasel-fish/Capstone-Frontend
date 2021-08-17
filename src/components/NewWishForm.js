import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import NewAnimalForm from './NewAnimalForm'

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
            <form onSubmit={handleSubmit}>
                <label>Pick a tracked animal or generate new information</label>
                <select onChange={handleDropChange} name='animal'>
                    <option value='generate'>Generate new</option>
                    {animals.map(anim => <option key={anim.id} value={anim.id}>{anim.common_name}</option>)}
                </select>
                {dropdown === 'generate' ? <NewAnimalForm animForm={formData} handleAnimChange={handleChange}/> : null}
                <input type='submit'></input>
            </form>
            {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
        </>
    )
}

export default NewWishForm