import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, Switch, Image } from 'react-native';
import { navigate } from '../utility/rootNavigation';
import { selectContact } from '../store/actions/contacts.action';

const Contact = ({ data }) => {
    const colorCodes = ['#00AA55', '#009FD4', '#B381B3', '#939393', '#E3BC00', '#D47500', '#DC2A2A'];
    const [isSelected, setSelected] = useState(false);
    const isEditmodeOn = useSelector(state => state.contacts.isEditable);
    const dispatch = useDispatch();

    const getAvtarColor = (text) => {
        const charCodes = text
            .toUpperCase()
            .split('') // => ["A", "A"]
            .map(char => char.charCodeAt(0)) // => [65, 65]
            .join(''); // => "6565"
        return parseInt(charCodes, 10);
    }

    useEffect(() => {
        if (!isEditmodeOn && isSelected) {
            toggleSwitch(false);
        }
    }, [isEditmodeOn]);

    const toggleSwitch = (isChecked) => {
        setSelected(isChecked);
        dispatch(selectContact(data.id, isChecked));
    }

    return <View style={styles.container}>
        {data.image ? 
        <Image testId="avatarImage" style={styles.avatarImage} source={{uri: data.image}}></Image>
        : 
        <Text maxFontSizeMultiplier={1.3} style={{ ...styles.avatar, backgroundColor: colorCodes[getAvtarColor(data.name || '') % colorCodes.length] }}>{(data.name || '')[0]}</Text>}
        <TouchableOpacity testId="gotoEdit" onPress={() => { navigate('Manage', { title: 'Edit contact', contact: data }) }} style={styles.contactName}>
            <Text>{data.name}</Text>
        </TouchableOpacity>
        {isEditmodeOn ? <Switch
                style={styles.select}
                trackColor={{ false: "#cfcfcf", true: "#ffffff" }}
                thumbColor={isSelected ? "green" : "#a9a9a9"}
                ios_backgroundColor="#ffffff"
                onValueChange={(value) => toggleSwitch(value)}
                value={isSelected}
            /> : null}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    avatar: {
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        overflow: 'hidden',
        flexBasis: 50,
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    contactName: {
        marginHorizontal: 10,
        fontSize: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexGrow: 1,
        flexShrink: 1
    },
    select: {
        width: 50,
        height: 30
    }
})

export default Contact;