import {createContext} from 'react'

function noop(){}

export const AuthContext = createContext({
    token:null,
    username:null,
    avatar:null,
    userId:null,
    login:noop,
    logout:noop,
    isAuthenticated:false
})