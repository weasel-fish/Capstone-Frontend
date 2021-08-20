import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledAlert = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
    width: 200px;
    padding: 3px;
    margin: 15px 0px 5px 0px;
`

function Alert({alert, alerts, setAlerts, setShowAlerts}) {

    const history = useHistory()

    function handleClick() {
        history.push(`/x-outing-page/${alert.outing.id}`)
    }
    
    function removeAlert() {
        fetch(`/alerts/${alert.id}`, {method: 'DELETE'})
        .then(() => {
            let newAlerts = alerts.filter(al => al.id !== alert.id)
            setAlerts(newAlerts)
            if(newAlerts.length === 0) {
                setShowAlerts(false)
            }
        })
    }

    return(
        <StyledAlert>
            <p>A {alert.animal} was seen on the {alert.outing.name} outing! ({alert.outing.date})</p>
            <button onClick={() => handleClick()}>Go to Outing</button>
            <button onClick={() => removeAlert()}>Remove Alert</button>
        </StyledAlert>
    )
}

export default Alert