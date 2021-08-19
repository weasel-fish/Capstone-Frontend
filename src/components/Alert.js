import {useHistory} from 'react-router-dom'

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
        <li>
            <p>A {alert.animal} was seen on the {alert.outing.name} outing! ({alert.outing.date})</p>
            <button onClick={() => handleClick()}>Go to Outing</button>
            <button onClick={() => removeAlert()}>Remove Alert</button>
        </li>
    )
}

export default Alert