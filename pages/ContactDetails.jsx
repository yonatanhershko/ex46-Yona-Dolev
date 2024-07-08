const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { contactService } from '../services/contact.service.js'
import { loadContacts } from '../store/actions/contact.actions.js'

export function ContactDetails() {
    const { contactId } = useParams()
    const [contact, setContact] = useState(null)
    useEffect(() => {
        contactService.get(contactId)
            .then(setContact)
            // .catch(err)
    }, [])


    if (!contact) return <h3>Loading..</h3>
    return (
        <div>
            <h1>Contact Details</h1>
            <p>Name:{contact.fullName}</p>
            <p>Number:{contact.number}</p>
            <Link to="/">Back to Contacts</Link>
        </div>
    )
}