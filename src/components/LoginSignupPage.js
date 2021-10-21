import { useState, useEffect } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
    /* margin: auto; */
`

const StyledButton = styled.button`
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    margin: 5px 0px 5px 0px;
    &:hover {
        background-color: #A42BF5;
        color: white;
        }
`

function LoginSignupPage() {
    const [signUp, setSignUp] = useState(false)
    
    useEffect(() => {
        document.title = "BugNet - Login"
    }, [])

    return (
        <>
        {signUp ? <SignupForm /> : <LoginForm />}
            <Container>
                {signUp ? null : <h3>Don't have an account?</h3>}
                <StyledButton onClick={() => {setSignUp(!signUp)}}>{signUp ? 'Nevermind, go back to Login' : 'Sign Up!'}</StyledButton>
            </Container>
        </>
    )
}

export default LoginSignupPage