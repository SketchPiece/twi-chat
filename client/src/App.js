import React from 'react';
import './index.css';
// import Chat from './pages/Chat';
import { BrowserRouter as Router } from 'react-router-dom';
// import ChatContainer from './components/chats/ChatContainer';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import Loader from './components/Loader';
import { AuthContext } from './context/AuthContext';
// import EasterEgg from './components/EasterEgg';


function App() {
  const {token,login,logout,reload,userId,ready} = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);


  if(!ready){
    return <Loader loader="main"/>
  }

  

  return (
    <AuthContext.Provider value={{
      token,login,logout,reload,userId,isAuthenticated
    }}>
      <Router>
            {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
