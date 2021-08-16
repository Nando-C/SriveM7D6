import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import companyReducer from "../reducers/company";
import jobReducer from "../reducers/jobsListed";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage/session";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
    companies: {
        favourites: [],
    },
    jobsListed: {
        jobs: [],
        isLoading: true,
        error: false,
    },
}

const persistConfig = {
    key: 'root',
    storage,
}

const bigReducer = combineReducers({
    companies: companyReducer,
    jobsListed: jobReducer,
})

const persistedReducer = persistReducer( persistConfig, bigReducer )

const configureStore = createStore( persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk)))
const persistor = persistStore( configureStore )

export { configureStore, persistor }