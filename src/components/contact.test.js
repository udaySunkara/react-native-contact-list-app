import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { create, act } from 'react-test-renderer';

import Contact from './contact';
import * as Actions from '../store/actions/contacts.action';
import * as rootNav from '../utility/rootNavigation';


const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

const mockSetState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

describe('<Contact />', () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [], isEditable: true } });
        });
        useState.mockImplementation(initial => [initial, mockSetState]);
    });
    afterEach(() => {
        useSelector.mockClear();
        useState.mockClear();
    });

    it('<Contact /> should render', () => {
        const tree = create(<Contact data={{image: '', id: '', name: ''}} />);
        expect(tree.toJSON().children.length).toBe(3);
    });

    it('Test useEffect', () => {
        useState.mockImplementation(initial => {
            return [initial === false ? true : initial, mockSetState];
        });
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [], isEditable: false } });
        });

        const mockSelectContact = jest.spyOn(Actions, 'selectContact').mockImplementation(() => true);
        
        let tree;

        act(() => {
            tree = create(<Contact data={{image: '', id: '1', name: ''}} />);
        })
        expect(mockSetState).toHaveBeenCalledWith(false);
        expect(mockSelectContact).toHaveBeenCalledWith('1', false);
    });

    it('Test whether avatar image is rendered when image is available', () => {
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [], isEditable: false } });
        });
        const tree = create(<Contact data={{image: 'path/to/image', id: '1', name: ''}} />);
        expect(tree.root.findByProps({'testId': 'avatarImage'}).children.length).toEqual(1);
    });

    it('Test whether avatar image is rendered when image is available', () => {
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [], isEditable: false } });
        });
        const mockNavigate = jest.spyOn(rootNav, 'navigate').mockImplementation(() => true);
        const _data = {image: 'path/to/image', id: '1', name: ''};
        const tree = create(<Contact data={_data} />);
        act(() => {
            tree.root.findByProps({'testId': 'gotoEdit'}).props.onPress();
        })
        expect(mockNavigate).toHaveBeenCalledWith('Manage', { title: 'Edit contact', contact: _data });
    });

})