const { useEffect } = React
const { useSelector } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { ContactList } from '../cmps/ContactList.jsx'
import { Filter } from '../cmps/Filter.jsx'
import { Sort } from '../cmps/Sort.jsx'
import { contactService } from '../services/contact.service.js'
import { loadContacts, removeContact, setFilterBy, setSortBy } from '../store/actions/contact.actions.js'

export function ContactIndex() {
    const contacts = useSelector(storeState => storeState.contacts)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const filterBy = useSelector(storeState => storeState.filterBy)
    const sortBy = useSelector(storeState => storeState.sortBy)

    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = contactService.getFilterFromSearchParams(searchParams)
    const defaultSort = contactService.getSortFromSearchParams(searchParams)

    useEffect(() => {
        setSearchParams({ ...filterBy, ...sortBy })
        loadContacts(filterBy, sortBy)
            .catch(() => {
                console.log('Could not load contacts')
            })
    }, [filterBy, sortBy])

    useEffect(() => {
        setFilterBy(defaultFilter)
        setSortBy(defaultSort)
    }, [])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
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
            <Sort onSetSortBy={onSetSortBy} />
            {!contacts.length && <h2>No contacts to display</h2>}
            <ContactList contacts={contacts} onDeleteContact={onDeleteContact} />
        </section>
    )

}