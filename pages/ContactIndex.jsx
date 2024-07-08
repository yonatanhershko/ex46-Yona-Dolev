const { useEffect } = React
const { useSelector } = ReactRedux
const { Link } = ReactRouterDOM

import { ContactList } from '../cmps/ContactList.jsx'
import { contactService } from '../services/contact.service.js'
import { loadContacts, removeContact } from '../store/actions/contact.actions.js'
import { SET_CONTACTS, store } from '../store/store.js'

export function ContactIndex() {
    const contacts = useSelector(storeState => storeState.contacts)
    const isLoading = useSelector(storeState => storeState.isLoading)

    useEffect(() => {
        loadContacts()
            .catch(() => {
                console.log('Could not load contacts')
            })
    }, [])

    function onDeleteContact(contactId) {
        removeContact(contactId)
            .catch(() => {
                console.log('Could not remove contact')
            })
    }

    if (!contacts) return <h3>Loading..</h3>
    return (
        <section className="contact-index">
            {isLoading
                ? <div>Loading..</div>
                : <ContactList contacts={contacts} onDeleteContact={onDeleteContact} />}

        </section>
    )

}