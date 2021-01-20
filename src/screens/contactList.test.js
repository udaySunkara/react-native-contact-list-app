import React, { useEffect } from 'react';
import { create, act } from 'react-test-renderer';
import ContactList from './contactList';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import * as Actions from '../store/actions/contacts.action';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
  }));

describe('<ContactList />', () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: []}});
        })
    });
    afterEach(() => {
        useSelector.mockClear();
    });

    it('<ContactList /> should render', () => {
        const tree = create(<ContactList />).toJSON();
        expect(tree.children.length).toEqual(1);
    })

    it('Test whether delete button is hidden when no contacts selected', () => {
        // const alert = jest.spyOn(Alert, 'alert');
        // alert.mockImplementation(callback => {
        //     return callback(true);
        // }) 
        const tree = create(<ContactList />);
        let deleteElmnt;
        try {
            deleteElmnt = tree.root.findByProps({'testId': 'deleteContacts'});
        } catch(e) {
            expect(e).toEqual(Error('No instances found with props: {"testId":"deleteContacts"}'));
        }
    })

    it('Test whether delete button is shown when atleast one contact is selected', () => {
        useSelector.mockImplementation(callback => {
            return callback({contacts: { selectedContacts: {"1": true}, atleastOneContactSelected: true, contactList: []}});
        })
        const tree = create(<ContactList />);
        const deleteElmnt = tree.root.findByProps({'testId': 'deleteContacts'});
        expect(deleteElmnt.children.length).toBe(1);
    })

    it('Test whether Alert is shown when delete button pressed', () => {
        const alert = jest.spyOn(Alert, 'alert');
        alert.mockImplementation(() => {
            return true;
        }) 
        useSelector.mockImplementation(callback => {
            return callback({contacts: { selectedContacts: {"1": true}, atleastOneContactSelected: true, contactList: []}});
        })
        const tree = create(<ContactList />);
        const deleteElmnt = tree.root.findByProps({'testId': 'deleteContacts'});
        act(() => {
            deleteElmnt.props.onPress();
        })
        expect(alert).toHaveBeenCalled();
    })

    it('Testing fetchallContacts in useEffect hook', async () => {
        const fetchAllContacts = jest.spyOn(Actions, 'fetchAllContacts').mockImplementation(() => true);
        await act(async () => {
            const tree = create(<ContactList />);
        });
        expect(fetchAllContacts).toHaveBeenCalledWith([]);
    })
    
});