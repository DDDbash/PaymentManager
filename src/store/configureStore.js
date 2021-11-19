import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import filtersReducer from '../reducers/filters';

//Store creation
export default () => {
    const store = createStore(
        combineReducers({
            accounts: accountsReducer,
            filters: filtersReducer
        }), applyMiddleware(thunk)
    );
    return store;
};

