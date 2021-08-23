import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {DirectUpload} from 'activestorage'
import {useHistory} from 'react-router'
import styled from 'styled-components'


const Container = styled.div`
    margin: auto;
    width: 500px;
    text-align: center;
`
const Error = styled.p`
    color: red;
    font-weight: 700;
`

const StyledForm = styled.form`
    display: flex;
    border: 2px solid black;
    border-radius: 8px;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 20px;
    margin-top: 40px;
    height: 400px;

    & input[type=submit] {
        /* align-self: center; */
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
const Button = styled.button`
    align-self: center;
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    margin: 5px 0px 50px 0px;
`

function CreateOutingForm({setDisplayForm}) {
    const [formData, setFormData] = useState({name:'', location: '', description: '', notes: ''})
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    
    function handleChange(e) {

        if(e.target.name === 'image') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }


        // setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.value
        // })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(!formData.image) {
            let resp = await fetch('/outings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // ...formData,
                    name: formData.name,
                    location: formData.location,
                    date: formData.date,
                    description: formData.description,
                    notes: formData.notes,
                    no_image: true
                })
            })
    
            if(resp.ok){
                resp.json().then(outing => {
                    dispatch({type: 'currentUser/addOuting', payload: outing})
                    setDisplayForm(false)
                })
            } else {
                resp.json().then(data => setErrors(data.errors))
            }
        } else {
            let resp = await fetch('/outings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // ...formData,
                    name: formData.name,
                    location: formData.location,
                    date: formData.date,
                    description: formData.description,
                    notes: formData.notes
                })
            })

            if(resp.ok) {
                resp.json().then(outing => {
                    handleUpload(formData.image, outing)
                })
            } else {
                resp.json().then(outing => setErrors(outing.errors))
            }
        }

    }

    function handleUpload(file, outing) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                setErrors([error])
            } else {
                fetch(`/outings/${outing.id}/add_image`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({image: blob.signed_id})
                })
                .then(resp => resp.json())
                .then(outing => {
                    dispatch({type: 'currentUser/addOuting', payload: outing})
                    history.push('/user-home')
                })
            }
        })
    }

    return (
        <Container>
            <StyledForm onSubmit={handleSubmit}>
                <label>Name: <input type='text' name='name' onChange={handleChange} value={formData.name}></input></label>
                <label>Where: <input type='text' name='location' onChange={handleChange} value={formData.location}></input></label>
                <label>When: <input type='date' name='date' onChange={handleChange} value={formData.date}></input></label>
                <label>Description: <input type='text' name='description' onChange={handleChange} value={formData.description}></input></label>
                <label>Notes: <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input></label>
                <label>Image: <input type='file' name='image' onChange={handleChange} ></input></label>
                <input type='submit' />
                {errors ? errors.map(error => <Error key={error}>{error}</Error>):null}
            </StyledForm>
            <Button onClick={() => history.push('/user-home')}>Cancel</Button>
        </Container>
    )
}

export default CreateOutingForm