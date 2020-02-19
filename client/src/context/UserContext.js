import {createContext} from 'react'

// function noop(){}

export const UserContext = createContext({
    userId:null,
    username:null,
    avatar:null,
    status:null,
    tag:null,
    load:null
})