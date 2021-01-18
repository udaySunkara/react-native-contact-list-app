import AsyncStorage from '@react-native-community/async-storage';
export const CONTACTS_INIT = 'INIT_CONTACTS';
export const NEW_CONTACT = 'NEW_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const SEARCH_CONTACT = 'SEARCH_CONTACT';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const SELECT_CONTACT = 'SELECT_CONTACT';
export const REMOVE_CONTACTS = 'REMOVE_CONTACTS';


export const getAllContacts = async () => {

    let contactList = [];
    await AsyncStorage.getItem('contactList', (err, list) => {
        if (err) return;
        contactList = JSON.parse(list || '[]');
        return list;
    });

    return contactList;
}

export const putNewContact = async (contactList, newContact) => {
    let _contactList = (contactList || []).concat([newContact]);
    await AsyncStorage.getItem('lastId', (err, id) => {
        if (err) return;
        newContact.id = '' + (parseInt(id || 0, 10) + 1);
        AsyncStorage.setItem('lastId', '' + newContact.id);
        AsyncStorage.setItem('contactList', JSON.stringify(_contactList));
    });
    return _contactList;
}

export const editContact = async (contactList, newContact) => {
    contactList.forEach((contact, index) => {
        if (contact.id === newContact.id) {
            contactList[index] = newContact;
        }
    });
    await AsyncStorage.setItem('contactList', JSON.stringify(contactList));

    return contactList;
}

export const fetchAllContacts = (contactList) => ({
    type: CONTACTS_INIT,
    payload: {contactList}
});

export const createNewContact = (contactList) => ({
    type: NEW_CONTACT,
    payload: {contactList}
});

export const updateContact = (contactList) => ({
    type: UPDATE_CONTACT,
    payload: {contactList}
});

export const searchContact = (searchTerm = '') => ({
    type: SEARCH_CONTACT,
    payload: {searchTerm}
});

export const toggleEdit = (isEditable) => ({
    type: TOGGLE_EDIT,
    payload: {isEditable}
});

export const selectContact = (id, isSelected) => ({
    type: SELECT_CONTACT,
    payload: {id, isSelected}
});

export const removeSelectedContacts = () => ({
    type: REMOVE_CONTACTS
});