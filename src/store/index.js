import {customerReducer} from "./customerReducer.js"
import { combineReducers, createStore } from "redux"

const rootReducer = combineReducers({
    customers: customerReducer
});

export const store = createStore(rootReducer)