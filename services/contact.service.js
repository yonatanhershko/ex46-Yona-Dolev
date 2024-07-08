import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CONTACT_KEY = 'contactDB'

_createContacts()

export const contactService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyContact,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams
}

function query(filterBy, sortBy) {
    return storageService.query(CONTACT_KEY)
        .then(contacts => {
            contacts = _filter(contacts, filterBy)
            contacts = _sort(contacts, sortBy)
            return contacts
        })
}

function get(contactId) {
    return storageService.get(CONTACT_KEY, contactId)
}

function remove(contactId) {
    return storageService.remove(CONTACT_KEY, contactId)
}

function save(contact) {
    if (contact._id) {
        return storageService.put(CONTACT_KEY, contact)
    } else {
        return storageService.post(CONTACT_KEY, contact)
    }
}

function getEmptyContact(fullName = '', number = '') {
    return { fullName, number }
}

function getDefaultFilter() {
    return { txt: '', number: '' }
}

function getDefaultSort() {
    return { field: 'name', dir: 1 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'pageIdx') {
            filterBy[field] = parseInt(searchParams.get(field))
            if (isNaN(filterBy[field])) filterBy[field] = undefined
        } else {
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}

function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        sortBy[field] = searchParams.get(field) || ''
    }
    return sortBy
}

function _filter(contacts, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        contacts = contacts.filter(contact => regExp.test(contact.fullName))
    }
    if (filterBy.number) {
        contacts = contacts.filter(contact => contact.number.startsWith(filterBy.number))
    }
    return contacts
}

function _sort(contacts, sortBy) {
    if (sortBy.field === 'name') {
        contacts = contacts.toSorted((c1, c2) => c1.fullName.localeCompare(c2.fullName) * sortBy.dir)
    } else if (sortBy.field === 'number') {
        contacts = contacts.toSorted((c1, c2) => (c2.number - c1.number) * sortBy.dir)
    }
    return contacts
}

function _createContacts() {
    let contacts = utilService.loadFromStorage(CONTACT_KEY)
    if (!contacts || !contacts.length) {
        contacts = []
        contacts.push(_createContact('Puki Pee'))
        contacts.push(_createContact('Muki Dee'))
        contacts.push(_createContact('Shuki Lee'))
        contacts.push(_createContact('Brano Tegania'))
        contacts.push(_createContact('Yonatan'))
        utilService.saveToStorage(CONTACT_KEY, contacts)
    }
}

function _createContact(fullName = 'Muki Dee', number = `05${utilService.getRandomIntInclusive(10000000, 99999999)}`) {
    return {
        _id: utilService.makeId(),
        fullName,
        number
    }
}
