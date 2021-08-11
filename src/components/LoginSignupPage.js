import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function LoginSignupPage() {
    const [signUp, setSignUp] = useState(false)
    
    return (
        <>
            <LoginForm />
            <p>Don't have an account?</p>
            <button onClick={() => {setSignUp(!signUp)}}>{signUp ? 'Nevermind' : 'Sign Up!'}</button>
            {signUp ? <SignupForm /> : null}
        </>
    )
}

export default LoginSignupPage