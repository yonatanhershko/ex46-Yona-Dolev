const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { contactService } from '../services/contact.service.js'
import { loadContacts } from '../store/actions/contact.actions.js'

function ContactDetails() {
    const { contactId } = useParams()
    const dispatch = useDispatch()
    const contacts = useSelector(storeState => storeState.contacts)
    const [contact, setContact] = useState(null)

    useEffect(() => {
        dispatch(loadContacts())
            .catch(() => {
                console.log('Could not load contacts')
            })
    }, [dispatch])

    useEffect(() => {
        if (contacts && contacts.length > 0) {
            const contact = contacts.find(contact => contact._id === contactId)
            setContact(contact)
        }
    }, [contacts, contactId])

    if (!contact) return <h3>Loading...</h3>

    return (
        <div>
            <h1>Contact Details</h1>
            <p>Name:{contact.fullName}</p>
            <p>Number:{contact.number}</p>
            <Link to="/">Back to Contacts</Link>
        </div>
    )
}