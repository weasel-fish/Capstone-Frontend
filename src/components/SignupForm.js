function SignupForm() {
    return (
        <>
            <h3>Sign Up:</h3>
            <form>
                <label>Username:</label>
                <input type='text'></input>
                <label>Password:</label>
                <input type='password'></input>
                <label>Email:</label>
                <input type='text'></input>
                <label>Avatar (image url):</label>
                <input type='text'></input>
                <input type='submit' value='Create Account'/>
            </form>
        </>
    )
}

export default SignupForm