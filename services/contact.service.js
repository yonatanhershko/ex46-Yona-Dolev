import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CONTACT_KEY = 'contactDB'

_createContacts()

export const contactService = {
    query,
    get,
    remove,
    save
}

function query() {
    return storageService.query(CONTACT_KEY)
        .then(contacts => contacts)
}

function get(contactId) {
    // console.log(contactId);
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
        for (let i = 0; i < 5; i++) {
            contacts.push(_createContact())
        }
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