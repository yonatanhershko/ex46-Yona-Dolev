const { useEffect } = React
const { useSelector } = ReactRedux
const { Link } = ReactRouterDOM

import { ContactList } from '../cmps/ContactList.jsx'
import { Filter } from '../cmps/Filter.jsx'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions.js'

export function ContactIndex() {
    const contacts = useSelector(storeState => storeState.contacts)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const filterBy = useSelector(storeState => storeState.filterBy)

    useEffect(() => {
        loadContacts(filterBy)
            .catch(() => {
                console.log('Could not load contacts')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onDeleteContact(contactId) {
        removeContact(contactId)
            .catch(() => {
                console.log('Could not remove contact')
            })
    }

    if (!contacts) return <h3>Loading..</h3>
    return (
        <section className="contact-index">
            <article className="add-container">
                <button className='btn btn-add'><Link to='/contact/edit'>Add</Link></button>
            </article>
            <Filter onSetFilter={onSetFilter} filterBy={filterBy} />
            {!contacts.length && <h2>No contacts to display</h2>}
            <ContactList contacts={contacts} onDeleteContact={onDeleteContact} />
        </section>
    )

}