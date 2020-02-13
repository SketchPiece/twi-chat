import {createContext} from 'react'

// function noop(){}

export const UserContext = createContext({
    userId:null,
    username:null,
    avatar:null
})