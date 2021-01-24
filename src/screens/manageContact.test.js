import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { create, act } from 'react-test-renderer';

import ManageContact from './manageContact';
import * as model from '../model/newContact';
import * as Actions from '../store/actions/contacts.action';


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

describe('<ManageContact />', () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ contacts: { selectedContacts: {}, atleastOneContactSelected: false, contactList: [] } });
        });
        useState.mockImplementation(initial => [initial, mockSetState]);
    });
    afterEach(() => {
        useSelector.mockClear();
        useState.mockClear();
    });

    it('<ManageContact /> should render', () => {
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);
        expect(tree.toJSON().children.length).toBe(7);
    });
    it('Test useEffect when route param is not passed', async () => {

        expect(mockSetState).not.toHaveBeenCalledWith({});
        expect(mockSetState).not.toHaveBeenCalledWith({ ...model.contactModel(), isValid: true });
    })

    it('Test useEffect when route param is passed', () => {
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);
        expect(mockSetState).toHaveBeenCalledWith(false);
        expect(mockSetState).toHaveBeenCalledWith({});
        expect(mockSetState).toHaveBeenCalledWith({ ...model.contactModel(), isValid: true });
    });

    it('Test setInput on name change', () => {
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'name' }).props.onChangeText('A');
        });
        expect(mockSetState).toHaveBeenCalledWith({
            name: 'A',
            company: '',
            email: '',
            number: '',
            fax: '',
            image: ''
        });
    });

    it('Test setInput on number change', () => {
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'number' }).props.onChangeText('8');
        });
        expect(mockSetState).toHaveBeenCalledWith({
            name: '',
            company: '',
            email: '',
            number: '8',
            fax: '',
            image: ''
        });
    });

    it('Test whether the save functionality is diabled when the form is invalid', () => {
        const mockPutNewContact = jest.spyOn(Actions, 'putNewContact');
        const mockEditContact = jest.spyOn(Actions, 'editContact');

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);


        act(() => {
            tree.root.findByProps({ 'testId': 'saveContact' }).props.onPress();
        });
        expect(mockPutNewContact).not.toHaveBeenCalled();
        expect(mockEditContact).not.toHaveBeenCalled();
    });

    it('Test whether the error message is displayed when name is empty', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.name.isTouched = true;
            return _contactModel;
        });

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: null } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'name' }).props.onEndEditing();
        })

        _contactModel.name.validations.required.isValid = false;

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);

    });

    it('Test whether the error message is displayed when email is empty', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.email.isTouched = true;
            return _contactModel;
        });

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: null } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'email' }).props.onEndEditing();
        })

        _contactModel.email.validations.email.isValid = false;

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);

    });

    it('Test whether the error message is displayed when number is empty', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.number.isTouched = true;
            return _contactModel;
        });

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: null } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'number' }).props.onEndEditing();
        })

        _contactModel.number.validations.phoneNumber.isValid = false;

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);

    });

    it('Test whether the error message is displayed when fax is empty', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.fax.isTouched = true;
            return _contactModel;
        });

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: null } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'fax' }).props.onEndEditing();
        })

        _contactModel.fax.validations.faxNumber.isValid = false;

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);

    });

    it('Test whether the save button is enabled when all form fields are valid - Add new contact', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.isValid = true;
            return _contactModel;
        });
        const mockPutNewContact = jest.spyOn(Actions, 'putNewContact').mockImplementation(() => Promise.resolve({}));
        const mockCreateNewContact = jest.spyOn(Actions, 'createNewContact').mockImplementation(() => true);


        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: null } }} />);

        act(() => {
            tree.root.findByProps({ 'testId': 'saveContact' }).props.onPress();
        })

        expect(mockPutNewContact).toHaveBeenCalled();
        return Actions.putNewContact().then((bar) => {
            expect(mockCreateNewContact).toHaveBeenCalledWith({});
          });
    });

    it('Test whether the save button is enabled when all form fields are valid - Manage contact', () => {
        const _contactModel = { ...model.contactModel() };
        jest.spyOn(model, 'contactModel').mockImplementation(() => {
            _contactModel.isValid = true;
            return _contactModel;
        });
        useState.mockImplementation(initial => {
            return [initial === true ? false : initial, mockSetState];
        });

        const mockEditContact = jest.spyOn(Actions, 'editContact').mockImplementation(() => Promise.resolve({}));
        const mockUpdateContact = jest.spyOn(Actions, 'updateContact');

        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'testId': 'saveContact' }).props.onPress();
        })

        expect(mockEditContact).toHaveBeenCalled();
        return Actions.editContact().then((res) => {
            expect(mockUpdateContact).toHaveBeenCalledWith({});
          });
    });

    it('Test whether the correct input is dirty - name input', () => {
        const _contactModel = { ...model.contactModel() };
        _contactModel.name.isTouched = true;
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'name' }).props.onFocus();
        })

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);
    });

    it('Test whether the correct input is dirty - email input', () => {
        const _contactModel = { ...model.contactModel() };
        _contactModel.email.isTouched = true;
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'email' }).props.onFocus();
        })

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);
    });

    it('Test whether the correct input is dirty - number input', () => {
        const _contactModel = { ...model.contactModel() };
        _contactModel.number.isTouched = true;
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'number' }).props.onFocus();
        })

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);
    });

    it('Test whether the correct input is dirty - fax input', () => {
        const _contactModel = { ...model.contactModel() };
        _contactModel.fax.isTouched = true;
        const mockNavigation = () => ({ setOptions: (data) => data, navigate: (screen) => screen, goBack: () => { } });
        const tree = create(<ManageContact navigation={mockNavigation()} route={{ params: { contact: {} } }} />);

        act(() => {
            tree.root.findByProps({ 'keyName': 'fax' }).props.onFocus();
        })

        expect(mockSetState).toHaveBeenCalledWith(_contactModel);
    });

})