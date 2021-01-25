import * as actions from './contacts.action'
import AsyncStorage from '@react-native-community/async-storage';
import { resolvePlugin } from '@babel/core';

describe('actions', () => {
  it('should getAllContacts from AsyncStorage getItem - success', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation((keyName, callback) => {
        callback(null, '[{"name": ""}]');
        return Promise.resolve();
    })
    const result = await actions.getAllContacts();
    expect(result).toEqual([{name: ''}]);
  });

  it('should getAllContacts from AsyncStorage getItem - error', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation((keyName, callback) => {
        callback(true);
        return Promise.resolve();
    })
    const result = await actions.getAllContacts();
    expect(result).toEqual([]);
  });

  it('should putNewContact into AsyncStorage setItem - success', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation((keyName, callback) => {
        callback(null, '10');
        return Promise.resolve();
    })
    const result = await actions.putNewContact([], {name: ''});
    expect(result).toEqual([{id: '11', name: ''}]);
  });

  it('should putNewContact into AsyncStorage setItem - error', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation((keyName, callback) => {
        callback(true);
        return Promise.resolve();
    })
    const result = await actions.putNewContact([], {name: ''});
    expect(result).toEqual([{name: ''}]);
  });

  it('should editContact using AsyncStorage setItem on contact found', async () => {
    jest.spyOn(AsyncStorage, 'setItem').mockImplementation(() => {
        return Promise.resolve();
    });
    const result = await actions.editContact([{id: '1', name: 'Abc'}, {id: '2', name: 'Bbc'}], {id: '2', name: 'Uday'});
    expect(result).toEqual([{id: '1', name: 'Abc'}, {id: '2', name: 'Uday'}]);
  });

  it('should editContact using AsyncStorage setItem on contact not found', async () => {
    jest.spyOn(AsyncStorage, 'setItem').mockImplementation(() => {
        return Promise.resolve();
    });
    const result = await actions.editContact([{id: '1', name: 'Abc'}, {id: '2', name: 'Bbc'}], {id: '3', name: 'Uday'});
    expect(result).toEqual([{id: '1', name: 'Abc'}, {id: '2', name: 'Bbc'}]);
  });

  it('should create an action to fetchAllContacts', () => {
    const contactList = [];
    const expectedAction = {
      type: actions.CONTACTS_INIT,
      payload: {contactList}
    }
    expect(actions.fetchAllContacts(contactList)).toEqual(expectedAction);
  });

  it('should create an action to createNewContact', () => {
    const contactList = [];
    const expectedAction = {
      type: actions.NEW_CONTACT,
      payload: {contactList}
    }
    expect(actions.createNewContact(contactList)).toEqual(expectedAction);
  });

  it('should create an action to updateContact', () => {
    const contactList = [];
    const expectedAction = {
      type: actions.UPDATE_CONTACT,
      payload: {contactList}
    }
    expect(actions.updateContact(contactList)).toEqual(expectedAction);
  });

  it('should create an action to searchContact', () => {
    const searchTerm = '';
    const expectedAction = {
      type: actions.SEARCH_CONTACT,
      payload: {searchTerm}
    }
    expect(actions.searchContact(searchTerm)).toEqual(expectedAction);
  });

  it('should create an action to toggleEdit', () => {
    const isEditable = false;
    const expectedAction = {
      type: actions.TOGGLE_EDIT,
      payload: {isEditable}
    }
    expect(actions.toggleEdit(isEditable)).toEqual(expectedAction);
  });

  it('should create an action to selectContact', () => {
    const _param = {id: '1', isSelected: true};
    const expectedAction = {
      type: actions.SELECT_CONTACT,
      payload: _param
    }
    expect(actions.selectContact(_param.id, _param.isSelected)).toEqual(expectedAction);
  });

  it('should create an action to removeSelectedContacts', () => {
    const expectedAction = {
      type: actions.REMOVE_CONTACTS
    }
    expect(actions.removeSelectedContacts()).toEqual(expectedAction);
  });

})