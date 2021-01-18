import React, { useState } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import { View, TextInput, StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { searchContact } from '../store/actions/contacts.action';

const ContactSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const isEditmodeOn = useSelector(state => state.contacts.isEditable);
    const dispatch = useDispatch();

    const onTermSubmit = () => {
        dispatch(searchContact(searchTerm));
    }

    return (<View style={styles.container}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        editable={!isEditmodeOn} 
        style={styles.textInput} 
        placeholder="Search contacts"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onEndEditing={onTermSubmit} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cfcfcf',
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 5,
        fontSize: 25,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    textInput: {
        flex: 1,
        marginLeft: 5
    }

})

export default ContactSearch;