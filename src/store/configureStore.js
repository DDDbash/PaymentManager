import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

//Store creation
export default () => {
    const store = createStore(
        combineReducers({
            accounts: accountsReducer,
            filters: filtersReducer,
            auth: authReducer
        }), applyMiddleware(thunk)
    );
    return store;
};

