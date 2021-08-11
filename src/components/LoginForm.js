function LoginForm() {
    return (
        <>
            <h3>Log In:</h3>
            <form>
                <label>Username:</label>
                <input type='text'></input>
                <label>Password:</label>
                <input type='password'></input>
                <input type='submit' value='Log In'/>
            </form>
        </>
    )
}

export default LoginForm