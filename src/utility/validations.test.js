import { validateFormFields, NUMBER_OF_REQUOIRED_FIELDS } from './validations';
import { contactModel, contactDataModel } from '../model/newContact';

describe('Test Validations', () => {
    it('Test when name touched but invalid', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        inputContactModel.name.isTouched = true;
        expectedContactModel.name.isTouched = true;
        expectedContactModel.name.validations.required.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(contactDataModel(), inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when name touched but valid', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.name = 'Abc';
        inputContactModel.name.isTouched = true;
        expectedContactModel.name.isTouched = true;
        expectedContactModel.name.validations.required.isValid = true;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when email touched but invalid - empty', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        inputContactModel.email.isTouched = true;
        expectedContactModel.email.isTouched = true;
        expectedContactModel.email.validations.email.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(contactDataModel(), inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when email touched but invalid - abc@', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.email = 'abc@';
        inputContactModel.email.isTouched = true;
        expectedContactModel.email.isTouched = true;
        expectedContactModel.email.validations.email.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when email touched but invalid - abc@optum', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.email = 'abc@optum';
        inputContactModel.email.isTouched = true;
        expectedContactModel.email.isTouched = true;
        expectedContactModel.email.validations.email.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when email touched but valid - abc@optum.com', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.email = 'abc@optum.com';
        inputContactModel.email.isTouched = true;
        expectedContactModel.email.isTouched = true;
        expectedContactModel.email.validations.email.isValid = true;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when number touched but invalid - empty', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        inputContactModel.number.isTouched = true;
        expectedContactModel.number.isTouched = true;
        expectedContactModel.number.validations.phoneNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(contactDataModel(), inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when number touched but invalid - abc8989', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.number = 'abc8989';
        inputContactModel.number.isTouched = true;
        expectedContactModel.number.isTouched = true;
        expectedContactModel.number.validations.phoneNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when number touched but invalid - 898*&$#_89', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.number = '898*&$#_89';
        inputContactModel.number.isTouched = true;
        expectedContactModel.number.isTouched = true;
        expectedContactModel.number.validations.phoneNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when number touched but valid - 8989898989', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.number = '8989898989';
        inputContactModel.number.isTouched = true;
        expectedContactModel.number.isTouched = true;
        expectedContactModel.number.validations.phoneNumber.isValid = true;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });

    it('Test when fax touched but invalid - empty', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        inputContactModel.fax.isTouched = true;
        expectedContactModel.fax.isTouched = true;
        expectedContactModel.fax.validations.faxNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(contactDataModel(), inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when fax touched but invalid - abc898', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.fax = 'abc898';
        inputContactModel.fax.isTouched = true;
        expectedContactModel.fax.isTouched = true;
        expectedContactModel.fax.validations.faxNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when fax touched but invalid - 898*&$', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.fax = '898*&$';
        inputContactModel.fax.isTouched = true;
        expectedContactModel.fax.isTouched = true;
        expectedContactModel.fax.validations.faxNumber.isValid = false;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
    
    it('Test when fax touched but valid - 898989', () =>{
        const inputContactModel = JSON.parse(JSON.stringify(contactModel()));
        const expectedContactModel = JSON.parse(JSON.stringify(contactModel()));
        const _contactDataModel = JSON.parse(JSON.stringify(contactDataModel()));
        _contactDataModel.fax = '898989';
        inputContactModel.fax.isTouched = true;
        expectedContactModel.fax.isTouched = true;
        expectedContactModel.fax.validations.faxNumber.isValid = true;
        expectedContactModel.isValid = false;
        expect(validateFormFields(_contactDataModel, inputContactModel, NUMBER_OF_REQUOIRED_FIELDS)).toEqual(expectedContactModel);
    });
});