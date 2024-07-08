const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM


import { contactService } from '../services/contact.service.js'


function ContactDetails() {
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContactDetails()
    }, [contactId])

    function loadContactDetails() {
        contactService.get(contactId)
            .then(contact => {
                setContact(contact)
            })
            .catch(err => {
                console.error('Failed to load contact details', err)
                navigate('/')
            })
    }

    return (
        <div>
            <h1>Contact Details</h1>
            <p>Name:{contact.fullName}</p>
            <p>Number:{contact.number}</p>
            <Link to="/">Back to Contacts</Link>
        </div>
    )

}