import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {favouritesReducer} from './favouritesReducer' 
import { filtersReducer } from './filtersReducer';

const rootReducer = combineReducers({
    favourites: favouritesReducer,
    filters: filtersReducer,
})

export const store = createStore(rootReducer, composeWithDevTools())