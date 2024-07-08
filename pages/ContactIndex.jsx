const { useSelector } = ReactRedux
import { contactService } from '../services/contact.service.js'
import { loadContacts } from '../store/actions/contact.actions.js'
import { SET_CONTACTS, store } from '../store/store.js'

export function ContactIndex() {
    const contacts = useSelector(storeState => storeState.contacts)

    useEffect(() => {
        loadContacts()
            .catch(() => {
                console.log('Could not load contacts')
            })
    }, [])

    function onMoveToContact(contactId) {
        console.log(contactId)
    }

    return (
        <section className="contact-index">
            {contacts.map(contact =>
                <article className="contact-container" key={contact._id}>
                    <h1>{contact.fullName}</h1>
                    <h2>{contact.number}</h2>
                    <button onClick={() => onMoveToContact(contact._id)}>Go To Details</button>
                </article>
            )}

        </section>
    )

}