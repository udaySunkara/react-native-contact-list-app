
import contcatsReducer from './contacts.reducer';
import * as actions from '../actions/contacts.action';

const initialState = {
    contactList: [],
    searchedContactList: null,
    selectedContacts: {},
    atleastOneContactSelected: false,
    isEditable: false
}

describe('contcats Reducer', () => {
  it('should return the initial state', () => {
    expect(contcatsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CONTACTS_INIT - sorted scenario 1', () => {
    const startAction = {
      type: actions.CONTACTS_INIT,
      payload: {contactList: [{name: 'Bbc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle CONTACTS_INIT - sorted scenario 2', () => {
    const startAction = {
      type: actions.CONTACTS_INIT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Bbc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle CONTACTS_INIT - sorted scenario 3', () => {
    const startAction = {
      type: actions.CONTACTS_INIT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Abc'}]});
  });

  it('should handle NEW_CONTACT - sorted scenario 1', () => {
    const startAction = {
      type: actions.NEW_CONTACT,
      payload: {contactList: [{name: 'Bbc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle NEW_CONTACT - sorted scenario 2', () => {
    const startAction = {
      type: actions.NEW_CONTACT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Bbc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle NEW_CONTACT - sorted scenario 3', () => {
    const startAction = {
      type: actions.NEW_CONTACT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Abc'}]});
  });

  it('should handle UPDATE_CONTACT - sorted scenario 1', () => {
    const startAction = {
      type: actions.UPDATE_CONTACT,
      payload: {contactList: [{name: 'Bbc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle UPDATE_CONTACT - sorted scenario 2', () => {
    const startAction = {
      type: actions.UPDATE_CONTACT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Bbc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Bbc'}]});
  });

  it('should handle UPDATE_CONTACT - sorted scenario 3', () => {
    const startAction = {
      type: actions.UPDATE_CONTACT,
      payload: {contactList: [{name: 'Abc'}, {name: 'Abc'}]}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, contactList: [{name: 'Abc'}, {name: 'Abc'}]});
  });

  it('should handle SEARCH_CONTACT - name', () => {
    const currentState = {
        ...initialState,
        contactList: [{name: 'Steve', email: 'qqq@abc.com', number: '8989898989'}, {name: 'John', email: 'www@abc.com', number: '9989898989'}]
    }
    const startAction = {
      type: actions.SEARCH_CONTACT,
      payload: {searchTerm: 'Steve'}
    };
    expect(contcatsReducer(currentState, startAction)).toEqual({...currentState, searchedContactList: [{name: 'Steve', email: 'qqq@abc.com', number: '8989898989'}]});
  });

  it('should handle SEARCH_CONTACT - Mobile number', () => {
    const currentState = {
        ...initialState,
        contactList: [{name: 'Steve', email: 'qqq@abc.com', number: '8989898989'}, {name: 'John', email: 'www@abc.com', number: '9989898989'}]
    }
    const startAction = {
      type: actions.SEARCH_CONTACT,
      payload: {searchTerm: '8989'}
    };
    expect(contcatsReducer(currentState, startAction)).toEqual({...currentState, searchedContactList: [{name: 'Steve', email: 'qqq@abc.com', number: '8989898989'}, {name: 'John', email: 'www@abc.com', number: '9989898989'}]});
  });

  it('should handle SEARCH_CONTACT - no match found', () => {
    const currentState = {
        ...initialState,
        contactList: [{name: 'Steve', email: 'qqq@abc.com', number: '8989898989'}, {name: 'John', email: 'www@abc.com', number: '9989898989'}]
    }
    const startAction = {
      type: actions.SEARCH_CONTACT,
      payload: {searchTerm: 'uday'}
    };
    expect(contcatsReducer(currentState, startAction)).toEqual({...currentState, searchedContactList: []});
  });

  it('should handle TOGGLE_EDIT when editable true', () => {
    
    const startAction = {
      type: actions.TOGGLE_EDIT,
      payload: {isEditable: true}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, isEditable: true});
  });

  it('should handle TOGGLE_EDIT when editable false', () => {
    
    const startAction = {
      type: actions.TOGGLE_EDIT,
      payload: {isEditable: false}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, isEditable: false});
  });

  it('should handle SELECT_CONTACT when contact selected', () => {
    
    const startAction = {
      type: actions.SELECT_CONTACT,
      payload: {isSelected: true, id: '111'}
    };
    expect(contcatsReducer(initialState, startAction)).toEqual({...initialState, selectedContacts: {'111': true}, atleastOneContactSelected: true});
  });

  it('should handle SELECT_CONTACT when contact deselected', () => {
    const currentState = {
        ...initialState,
        selectedContacts: {'111': true}
    } 
    const startAction = {
      type: actions.SELECT_CONTACT,
      payload: {isSelected: false, id: '111'}
    };
    expect(contcatsReducer(currentState, startAction)).toEqual({...initialState, selectedContacts: {}, atleastOneContactSelected: false});
  });

  it('should handle REMOVE_CONTACTS when contact deselected', () => {
    const currentState = {
        ...initialState,
        contactList: [{id: '111', name: 'Abc'}, {id: '222', name: 'bbc'}, {id: '333', name: 'Cbc'}],
        selectedContacts: {'222': true}
    } 
    const startAction = {
      type: actions.REMOVE_CONTACTS
    };
    expect(contcatsReducer(currentState, startAction)).toEqual({...initialState, selectedContacts: {}, contactList: [{id: '111', name: 'Abc'}, {id: '333', name: 'Cbc'}]});
  });
});