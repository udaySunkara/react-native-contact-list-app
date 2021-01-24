export const contactModel = () => ({
    name: {
        placeholder: 'Enter Name',
        isTouched: false,
        keyboardType: 'default',
        validations: {
            required: {
                isValid: true,
                message: 'Please enter valid name'
            }
        }
    },
    company: {
        placeholder: 'Enter Company',
        isTouched: false,
        keyboardType: 'default'
    },
    email: {
        placeholder: 'Enter email',
        isTouched: false,
        keyboardType: 'default',
        validations: {
            email: {
                isValid: true,
                message: 'Please enter valid email'
            }
        }
    },
    number: {
        placeholder: 'Enter phone number',
        isTouched: false,
        keyboardType: 'phone-pad',
        validations: {
            phoneNumber: {
                isValid: true,
                message: 'Please enter valid mobile number'
            }
        }
    },
    fax: {
        placeholder: 'Enter fax number',
        isTouched: false,
        keyboardType: 'default',
        validations: {
            faxNumber: {
                isValid: true,
                message: 'Please enter valid fax'
            }
        }
    },
    isValid: false
});

export const contactDataModel = () => ({
    name: '',
    company: '',
    email: '',
    number: '',
    fax: '',
    image: ''
});