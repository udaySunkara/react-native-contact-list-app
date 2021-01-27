export const NUMBER_OF_REQUOIRED_FIELDS = 4;
export const validateFormFields = (newContact, _contactConfig, numberOfRequiredFields) => {
    let invalidCount = 0;
    let numberOfReqFieldsTouched = 0;
    let isCurrentFieldValid = false;
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileNumberRegEx = /^[0-9]{10}$/g;
    const faxNumberRegEx = /^\+?[0-9]{6,}$/;

    Object.keys(newContact).forEach((fieldName) => {
        if (fieldName !== 'id' && fieldName !== 'image' && _contactConfig[fieldName].isTouched && _contactConfig[fieldName].validations) {
            switch(fieldName) {
                case 'name':
                    isCurrentFieldValid = newContact[fieldName] ? true : false
                    _contactConfig[fieldName].validations.required.isValid = isCurrentFieldValid;
                    break;
                case 'email':
                    isCurrentFieldValid = emailRegEx.test(newContact[fieldName]);
                    _contactConfig[fieldName].validations.email.isValid = isCurrentFieldValid;
                    break;
                case 'number':
                    isCurrentFieldValid = mobileNumberRegEx.test(newContact[fieldName]);
                    _contactConfig[fieldName].validations.phoneNumber.isValid = isCurrentFieldValid;
                    break;
                case 'fax':
                    isCurrentFieldValid = faxNumberRegEx.test(newContact[fieldName]);
                    _contactConfig[fieldName].validations.faxNumber.isValid = isCurrentFieldValid;
                    break;
            }
            ++numberOfReqFieldsTouched;
            if (!isCurrentFieldValid) { ++invalidCount; }
        }
    });
    _contactConfig.isValid = (invalidCount === 0 && (numberOfReqFieldsTouched === numberOfRequiredFields || _contactConfig.isValid));
    return _contactConfig;
}
