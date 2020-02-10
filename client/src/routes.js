import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
// import Chat from './pages/Chat'
import Login from './pages/Login'
import Chat from './pages/Chat'

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path='/chat' exact>
                    <Chat />
                </Route>
                <Redirect to="/chat" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}