import {User} from '../lib/app-interface'

// 定义action类型
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const host = 'http://localhost:4455'

// 定义action creator
export const setUser = (user: User) => ({type: SET_USER, payload: user})
export const removeUser = () => ({type: REMOVE_USER})

const initialState = {user: JSON.parse(localStorage.getItem('user')!)||''}
export const userReducer = (state = initialState, action:{type: string, payload?: User}) => {
    switch (action.type) {
        case SET_USER:
            const newUser = action.payload!
            newUser.avatar = host + newUser.avatar
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {...state, user: action.payload}
        case REMOVE_USER:
            localStorage.removeItem('user')
            return {...state, user: null}
        default:
            return state
    }
}