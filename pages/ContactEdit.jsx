const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { contactService } from '../services/contact.service.js'
import { loadContacts } from '../store/actions/contact.actions.js'

export function ContactEdit() {
    const { contactId } = useParams()
    const [contact, setContact] = useState(null)
    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.get(params.contactId)
            .then(setContactToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setContactToEdit(prevContactToEdit => ({ ...prevContactToEdit, [field]: value }))
    }

    function onSaveContact(ev) {
        ev.preventDefault()
        contactService.save(contactToEdit)
            .then((savedContact) => {
                navigate('/contact')
                showSuccessMsg(`Contact Saved (id: ${savedContact._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save contact')
                console.log('err:', err)
            })
    }

    const { fullName, number} = contactToEdit




    if (!contactToEdit) return <h3>Loading...</h3>

    return (
        <section className="contact-edit">
            <form onSubmit={onSaveContact}>
                <label htmlFor="fullName">Name:</label>
                <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" />

                <label htmlFor="number">Number:</label>
                <input onChange={handleChange} value={number} type="number" name="number" id="number" />

                <button>Save</button>
            </form>
            <Link to="/contact">Back to Contacts</Link>
        </section>
    )
}