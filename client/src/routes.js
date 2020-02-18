import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
// import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
// import Wrapper from './Wrapper'
import Main from './pages/Main'


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path='/chat' exact>
                    <Main chatRoute={true} />
                </Route>
                <Route path='/profile' exact>
                    <Main/>
                </Route>
                <Route path='/profile/:id' exact>
                    <Main otherProfile={true} />
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
            <Route path='/register' exact>
                <Register />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}