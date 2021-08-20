import styled from "styled-components"

const FootDiv = styled.div`
  margin-top: 20px;
  position: fixed;
  height: 35px;
  bottom: 0;
  width: 100%;
  color: rgba(186, 235, 161, 92);
  font-weight: bold;
  background-color: #8C69B8;
  text-align: center;
  padding-top: 0px;
  padding-bottom: 10px;
`
function Footer() {
    return (
        <>
            <FootDiv>
                <p>A React and Rails Creation by Kyle Ermentrout</p>
            </FootDiv>
        </>
    )
}

export default Footer