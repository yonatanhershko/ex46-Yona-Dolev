import { contactService } from "../services/contact.service.js"

const { createStore } = Redux

//* CONTACTS
export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'


const initialState = {
    contacts: undefined,
    isLoading: false,
    filterBy: contactService.getDefaultFilter(),
    sortBy: contactService.getDefaultSort()
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //     //* CONTACT
        case SET_CONTACTS:
            return {
                ...state,
                contacts: cmd.contacts
            }
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== cmd.contactId)
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, cmd.contact]
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === cmd.contact._id ? cmd.contact : contact)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: cmd.sortBy
            }
        default:
            return state
    }
}


export const store = createStore(appReducer)
