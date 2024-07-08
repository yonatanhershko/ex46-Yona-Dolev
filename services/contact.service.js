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
    getEmptyContact
}

function query(filterBy) {
    return storageService.query(CONTACT_KEY)
        .then(contacts => {
            contacts = _filter(contacts, filterBy)
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

function getEmptyContact(fullName = '', number = '') {
    return { fullName, number }
}

function getDefaultFilter() {
    return { txt: '', number: '' }
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