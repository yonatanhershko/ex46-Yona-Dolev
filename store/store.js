

import {  } from "module";

const { createStore } = Redux

//* CONTACTS
export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const SET_IS_LOADING = 'SET_IS_LOADING'



const initialState = {
    contacts: [],
    isLoading: false,
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
        default:
            return state
    }
}


export const store = createStore(appReducer)
