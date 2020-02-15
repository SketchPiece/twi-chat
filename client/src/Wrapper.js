import React, { useState,useContext, useEffect } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Main from './pages/Main'
import { AuthContext } from './context/AuthContext';
import useSocket from 'use-socket.io-client'
import {UserContext} from './context/UserContext'

export default function Wrapper() {
    

    return (
        <Switch>
            <Route path='/chat' exact>
                <Main chatRoute={true} />
            </Route>
            <Route path='/profile' exact>
                <Main chatRoute={false} />
            </Route>
            <Redirect to="/chat" />
        </Switch>
    )
}
