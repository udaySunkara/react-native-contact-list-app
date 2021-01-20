import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactSearch from '../components/contactSearch';
import ContactListContainer from '../components/contactListContainer';
import { getAllContacts, fetchAllContacts, removeSelectedContacts } from '../store/actions/contacts.action';
import { MaterialIcons } from '@expo/vector-icons';


const ContactList = () => {
    const dispatch = useDispatch();
    const {selectedContacts, atleastOneContactSelected} = useSelector(state => state.contacts);

    const handleDelete = () => {
        Alert.alert(
            "Delete",
            `Are you sure to delete ${Object.keys(selectedContacts || {}).length} contact(s)?`,
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => dispatch(removeSelectedContacts()) }
            ],
            { cancelable: false }
          );
    }
    useEffect(() => {
        getAllContacts().then((_contactList) => {
            dispatch(fetchAllContacts(_contactList));
        });
        // removeContact();
    }, []);

    return <View style={styles.container}>
        <View>
            <ContactSearch></ContactSearch>
            <ContactListContainer style={styles.listContainer}></ContactListContainer>
        </View>
        {atleastOneContactSelected ? <TouchableOpacity testId="deleteContacts" onPress={() => handleDelete()} style={styles.delete}>
            <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
            : null}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
    },
    listContainer: {
        alignSelf: 'flex-start',
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        backgroundColor: '#D47500',
        borderRadius: 50 / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        alignSelf: 'center',
        bottom: 20,
        zIndex: 9999
    }
});

export default ContactList;