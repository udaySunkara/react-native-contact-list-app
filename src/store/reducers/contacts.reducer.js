import AsyncStorage from '@react-native-community/async-storage';
import { CONTACTS_INIT, NEW_CONTACT, UPDATE_CONTACT, SEARCH_CONTACT, TOGGLE_EDIT, SELECT_CONTACT, REMOVE_CONTACTS } from '../actions/contacts.action';

const initialState = {
    contactList: [],
    searchedContactList: null,
    selectedContacts: {},
    atleastOneContactSelected: false,
    isEditable: false
}

const sortContactList = (contactList) => {
    return (contactList || []).sort((a, b) => { 
        const aName = a?.name.toUpperCase();
        const bName = b?.name.toUpperCase();
        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
    });
}

const searchContact = (state, searchTerm) => {
    const searchedContactList = state.contactList.filter((contact) => {
        return contact.name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 || contact.number.indexOf(searchTerm) > -1
    });
    return {...state, searchedContactList }
}

const toggleContact = (state, key, value) => {
    const _selectedContacts = {...state.selectedContacts};
    if (!value) {
        delete _selectedContacts[key];
    } else {
        _selectedContacts[key] = value;
    }
    return {...state, selectedContacts: _selectedContacts, atleastOneContactSelected: Object.keys(_selectedContacts).length > 0 };
}

export const removeSelectedContacts = (state) => {
    const selectedIdList = Object.keys(state.selectedContacts);

    const _contactList = state.contactList.filter(contact =>  selectedIdList.indexOf(contact.id) === -1);
    AsyncStorage.setItem('contactList', JSON.stringify(_contactList));

    return {...state, contactList: _contactList, atleastOneContactSelected: false, isEditable: false, selectedContacts: {}, searchedContactList: null};
}

const contactsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONTACTS_INIT:
            return {...state, contactList: sortContactList(action.payload?.contactList), searchedContactList: null }
        case NEW_CONTACT: 
            return {...state, contactList: sortContactList(action.payload?.contactList), searchedContactList: null }
        case UPDATE_CONTACT:
            return {...state, contactList: sortContactList(action.payload?.contactList), searchedContactList: null }
        case SEARCH_CONTACT:
            return searchContact(state, action.payload?.searchTerm)
        case TOGGLE_EDIT:
            return {...state, isEditable: action.payload?.isEditable}
        case SELECT_CONTACT: 
            return toggleContact(state, action.payload?.id, action.payload?.isSelected)
        case REMOVE_CONTACTS:
            return removeSelectedContacts(state)
        default:
            return state;
    }
}

export default contactsReducer;