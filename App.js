import React, { useState } from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import configureStore from './src/store/store';
import ContactList from './src/screens/contactList';
import ManageContact from './src/screens/manageContact';
import { navigate, navigationRef } from './src/utility/rootNavigation';
import { toggleEdit } from './src/store/actions/contacts.action';

const Stack = createStackNavigator();

const StackNav = () => {
  let isEditOn = false;
  const isEditmodeOn = useSelector(state => { isEditOn = state.contacts.isEditable; return isEditOn } );
  const contactList = useSelector(state => state.contacts.contactList );
  const dispatch = useDispatch();

  const enableEditView = () => {
    dispatch(toggleEdit(!isEditOn));
  }

  const navigateToManageScreen = () => {
    if (isEditmodeOn) return; navigate('Manage', { title: 'New contact' })
  }

  return <Stack.Navigator initialRouteName="Contacts">
    <Stack.Screen
      name="Contacts"
      component={ContactList}
      options={{
        title: 'Contact list', headerRight: () => {
          return <TouchableOpacity testId="newContact" onPress={() => { navigateToManageScreen(); }}>
            <AntDesign name="pluscircle" size={24} color={isEditmodeOn ? '#cfcfcf' : '#00AA55'} />
          </TouchableOpacity>
        },
        headerLeft: () => {
        return <>{contactList && contactList.length > 0 ? <TouchableOpacity testId="selectContact" onPress={() => enableEditView()} style={styles.headerLeft}>{ !isEditmodeOn ? <Text testId="lblSelect" maxFontSizeMultiplier={1.5}>Select</Text>: <Text testId="lblUndo" maxFontSizeMultiplier={1.5}>Undo</Text>}</TouchableOpacity> : null}</>
        },
        headerRightContainerStyle: styles.headerRight,
        headerTitleStyle: styles.headerTitle,
        headerTitleAllowFontScaling: false
      }}
    />
    <Stack.Screen
      name="Manage"
      component={ManageContact}
      options={{ title: 'Edit contact', headerTitleStyle: styles.headerTitle, headerTitleAllowFontScaling: false }}
    />
  </Stack.Navigator>
}

export default function App() {


  

  return (
    <Provider store={configureStore}>
      <NavigationContainer ref={navigationRef}>
        <StackNav/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginTop: 8,
    fontSize: PixelRatio.getFontScale() > 1.2 ? 25 : 20
  },
  headerRight: {
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerLeft: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 14
  }
});
