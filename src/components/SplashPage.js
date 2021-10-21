import { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 200px;
    height: 67px;
    background-color: #8C69B8;
    text-align: center;
    margin: auto;
    margin-top: 20%;
    border-radius: 8px;
    padding: 0px 0px 0px 0px;
`

const Logo = styled.h1`
    color:rgba(186, 235, 161, 92);
    font-size: 50px;
`

function SplashPage() {

    useEffect(() => {
        document.title = "BugNet"
    }, [])
    
    return (
        <Container>
            <Logo>BugNet</Logo>
        </Container>
    )
}

export default SplashPage