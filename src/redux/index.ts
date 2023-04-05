import { createStore, legacy_createStore } from 'redux'
import { userReducer } from './user'

export const store = legacy_createStore(userReducer)
