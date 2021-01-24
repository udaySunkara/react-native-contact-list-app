import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';


const InputField = ({ value, placeholder, validateForm, inputRef, updateInput, fieldName, moveToNext, index, markAsDirty, contactConfig }) => {
    return <View style={styles.container}>
        <TextInput keyName={fieldName} maxFontSizeMultiplier={1.5} autoCapitalize='none' keyboardType={contactConfig[fieldName].keyboardType} ref={inputRef} style={styles.input} onEndEditing={() => { validateForm(); moveToNext(index) }} onFocus={() => markAsDirty(fieldName)} onChangeText={text => updateInput(fieldName, text)} defaultValue={value} placeholder={placeholder} />
        {contactConfig[fieldName].isTouched &&
            contactConfig[fieldName].validations &&
            Object.keys(contactConfig[fieldName].validations).map((validateKey, index) => {
                return <>
                    {!contactConfig[fieldName].validations[validateKey].isValid ? <Text testId={`${validateKey}-${fieldName}`} key={`${validateKey}-${fieldName}`} style={styles.errMsg}>{contactConfig[fieldName].validations[validateKey].message}</Text> : null}
                </>
            })}
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    errMsg: {
        color: 'red',
        fontSize: 10,
    },
    input: {
        backgroundColor: '#cfcfcf',
        color: '#000000',
        borderBottomColor: '#dfdfdf',
        padding: 10,
        borderBottomWidth: 2,
        borderRadius: 5
    }
});

export default InputField;