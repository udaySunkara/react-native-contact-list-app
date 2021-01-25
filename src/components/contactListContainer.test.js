import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { create, act } from 'react-test-renderer';

import ContactListContainer from './contactListContainer';
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

describe('<ContactListContainer />', () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [{name: '', email: ''}], isEditable: true } });
        });
        useState.mockImplementation(initial => [initial, mockSetState]);
    });
    afterEach(() => {
        useSelector.mockClear();
        useState.mockClear();
    });

    it('<ContactListContainer /> should render', () => {
        const tree = create(<ContactListContainer />);
        expect(tree.toJSON().children.length).toBe(1);
    });


})