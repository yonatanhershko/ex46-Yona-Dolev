import { contactService } from '../../services/contact.service.js'
import { ADD_CONTACT, REMOVE_CONTACT, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, UPDATE_CONTACT } from '../store.js'
import { SET_CONTACTS, store } from '../store.js'


export function loadContacts(filterBy, sortBy) {

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return contactService.query(filterBy, sortBy)
        .then(contacts => {
            store.dispatch({
                type: SET_CONTACTS,
                contacts
            })
        })
        .catch(err => {
            console.error('Cannot load contacts:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveContact(contact) {
    const type = (contact._id) ? UPDATE_CONTACT : ADD_CONTACT
    return contactService.save(contact)
        .then(savedContact => {
            store.dispatch({
                type,
                contact: savedContact
            })
            return savedContact
        })
        .catch(err => {
            console.error('Cannot save contact:', err)
            throw err
        })
}

export function removeContact(contactId) {
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({
                type: REMOVE_CONTACT,
                contactId
            })
        })
        .catch(err => {
            console.error('Cannot remove contact:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY , sortBy})
}