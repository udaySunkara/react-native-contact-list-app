import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createNewContact, putNewContact, editContact, updateContact } from '../store/actions/contacts.action';
import InputField from '../components/InputFields';
import {contactModel, contactDataModel } from '../model/newContact';
import AvatarEditor from '../components/avatarEditor';

const ManageContact = ({ navigation, route }) => {
    const contactList = useSelector(state => state.contacts.contactList || []);
    const [newContact, setNewContact] = useState(contactDataModel());
    const [contactConfig, setContactConfig] = useState(contactModel());
    const InputRefList = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileNumberRegEx = /^[0-9]{10}$/g;
    const faxNumberRegEx = /^\+?[0-9]{6,}$/;
    const [isNewContact, setIsNewContact] = useState(true);
    const displatch = useDispatch();

    const setInput = (key, value) => {
        const _newContact = { ...newContact };
        _newContact[key] = value;
        setNewContact(_newContact);
    }

    const dispatchContactUpdate = (contactList, newContact) => {
        if (isNewContact) {
            putNewContact(contactList, newContact).then((_contactList) => {
                displatch(createNewContact(_contactList));
                navigation.navigate('Contacts');
            });
        } else {
            editContact(contactList, newContact).then((_contactList) => {
                displatch(updateContact(_contactList));
                navigation.navigate('Contacts');
            });
        }

    }

    const moveToNext = (index) => {
        InputRefList[index + 1] && InputRefList[index + 1].current?.focus();
    }

    const markAsDirty = (fieldName) => {
        const _contactConfig = JSON.parse(JSON.stringify(contactConfig));
        _contactConfig[fieldName].isTouched = true;
        setContactConfig(_contactConfig);
    }

    const validateForm = () => {
        const _contactConfig = JSON.parse(JSON.stringify(contactConfig));
        let invalidCount = 0;
        let numberOfReqFieldsTouched = 0;
        let isCurrentFieldValid = false;
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
        _contactConfig.isValid = (invalidCount === 0 && (numberOfReqFieldsTouched === 4 || contactConfig.isValid));
        setContactConfig(_contactConfig);
    }

    const addProfileImage = (uri) => {
        setNewContact({...newContact, image: uri});
    }

    useEffect(() => {
        navigation.setOptions({ title: route.params?.title });
        const _contact = route.params && route.params.contact;
        setIsNewContact(_contact ? false : true);
        if (route && _contact) {
            setNewContact(_contact);
            const _contactModel = {...contactModel(), isValid: true};
            setContactConfig(_contactModel);
        }
    }, []);

    return <View style={styles.container}>
        <AvatarEditor avatarImage={newContact.image} addImage={(uri) => addProfileImage(uri)}/>
        {Object.keys(newContact).map((fieldName, index) => {
            return fieldName !== 'id' && fieldName !== 'image' ? (<>
                <InputField key={fieldName} {...contactConfig[fieldName]} contactConfig={contactConfig} value={newContact[fieldName]} updateInput={setInput} fieldName={fieldName} inputRef={InputRefList[index]} moveToNext={moveToNext} index={index} markAsDirty={markAsDirty} validateForm={validateForm}>
                </InputField>
            </>) : null;
        })}

        {<View style={styles.btnContainer}>
            <TouchableOpacity testId="saveContact" style={[styles.btn, styles.primaryBtn, { backgroundColor: (contactConfig.isValid ? '#1870d5' : '#cfcfcf') }]} onPress={() => { if (contactConfig.isValid) { dispatchContactUpdate(contactList, newContact); } }}>
                <Text maxFontSizeMultiplier={1.5} style={[styles.primaryBtn, {backgroundColor: (contactConfig.isValid ? '#1870d5' : '#cfcfcf')}]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity testId="cancelContact" style={[styles.btn, styles.secondaryBtn]} onPress={() => navigation.goBack()}>
                <Text maxFontSizeMultiplier={1.5} style={styles.secondaryBtn}>Cancel</Text>
            </TouchableOpacity>
        </View>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 15,
        borderRadius: 5
    },
    primaryBtn: {
        backgroundColor: '#1870d5',
        color: '#ffffff'
    },
    secondaryBtn: {
        backgroundColor: '#dfdfdf',
        color: '#000000'
    }
})

export default ManageContact;