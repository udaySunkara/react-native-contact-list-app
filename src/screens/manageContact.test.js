import React from 'react';
import { useSelector } from 'react-redux';
import { create, act} from 'react-test-renderer';
import ManageContact from './manageContact';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('<ManageContact />', () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: []}});
        })
    });
    afterEach(() => {
        useSelector.mockClear();
    });

    it('<ManageContact /> should render', () => {
        const tree = create(<ManageContact />).toJSON();
        expect(tree.children.length).toBe(7);
    })
})