import { createStore, combineReducers, applyMiddleware } from 'redux';
import contactsReducer from './reducers/contacts.reducer';
import { logAction } from '../utility/log.middleware';

const rootReducer = combineReducers({
    contacts: contactsReducer
});

const configureStore = createStore(rootReducer, applyMiddleware(logAction));
export default configureStore;