import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createNewContact, putNewContact, editContact, updateContact } from '../store/actions/contacts.action';
import InputField from '../components/InputFields';
import {contactModel, contactDataModel } from '../model/newContact';
import AvatarEditor from '../components/avatarEditor';
import { NUMBER_OF_REQUOIRED_FIELDS, validateFormFields } from '../utility/validations';

const ManageContact = ({ navigation, route }) => {
    const contactList = useSelector(state => state.contacts.contactList || []);
    const [newContact, setNewContact] = useState(contactDataModel());
    const [contactConfig, setContactConfig] = useState(contactModel());
    const InputRefList = [useRef(null), useRef(null), useRef(null), useRef(null)];
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
        setContactConfig(validateFormFields(newContact, _contactConfig, NUMBER_OF_REQUOIRED_FIELDS));
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