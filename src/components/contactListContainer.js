import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Contact from './contact';

const ContactListContainer = () => {
    const contactList = useSelector(state => [...state.contacts.contactList]);
    const searchedContactList = useSelector(state => state.contacts.searchedContactList);

    const renderContactList = ({ item }) => {
        return <Contact data={item}></Contact>
    }

    return <SafeAreaView>
            <FlatList
                data={searchedContactList || contactList}
                keyExtractor={(item) => item.id}
                renderItem={renderContactList}
            />
        </SafeAreaView>
}

export default ContactListContainer;