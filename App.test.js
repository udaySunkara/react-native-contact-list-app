import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create, act } from 'react-test-renderer';
import { Text } from 'react-native';

import App from './App';
import configureStore from './src/store/store';
import { Provider } from 'react-redux';
import * as rootNav from './src/utility/rootNavigation';


jest.mock('react-redux', () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));
let mockNavigate = null; 

describe('<App />', () => {

  beforeEach(() => {
    mockNavigate = jest.spyOn(rootNav, 'navigate');
    mockNavigate.mockImplementation(() => true);
    useSelector.mockImplementation(callback => {
      return callback({contacts: {isEditable: false, contactList: [], searchedContactList: []}});
    });
  });
  afterEach(() => {
    useSelector.mockClear();
  });


  it('App renders correctly', () => {
    const tree = create(<Provider store={configureStore}><App /></Provider>).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('Test New contact on press event', () => {
    const tree = create(<Provider store={configureStore}><App /></Provider>);
    act(() => {
      tree.root.findByProps({ 'testId': 'newContact' }).props.onPress()
    })
    expect(mockNavigate).toHaveBeenCalledWith('Manage', { title: 'New contact' });
  });

  it('Test whether select button is hidden if no contacts listed', () => {
    
    const tree = create(<Provider store={configureStore}><App /></Provider>);
    let selectElmnt = null;
      try {
        selectElmnt = tree.root.findByProps({ 'testId': 'selectContact' });
      } catch(e) {
        expect(e).toEqual(Error('No instances found with props: {"testId":"selectContact"}'));
      }
  });

  it('Test whether select button is shown if atleast one contact is listed', () => {
    useSelector.mockImplementation(callback => {
      return callback({contacts: {isEditable: false, contactList: [{id: 1, name: 'Abc', number: '', email: '', fax: '', company: ''}], searchedContactList: []}});
    });

    const tree = create(<Provider store={configureStore}><App /></Provider>);
    const selectElmnt = tree.root.findByProps({ 'testId': 'selectContact' });
    expect(selectElmnt.children.length).toBe(1);
    tree.unmount();
  });

  it('Test whether undo label is shown if select on presess event is triggered', () => {
    useSelector.mockImplementation(callback => {
      return callback({contacts: {isEditable: true, contactList: [{id: 1, name: 'Abc', number: '', email: '', fax: '', company: ''}], searchedContactList: []}});
    });

    const tree = create(<App />);
    act(() => {
      tree.root.findByProps({ 'testId': 'selectContact' }).props.onPress();
      
    });

    const undoElmnt = tree.root.findByProps({ 'testId': 'lblUndo' });
    expect(undoElmnt.children.length).toBe(1);
  });
});