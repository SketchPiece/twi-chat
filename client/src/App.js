import React from 'react';
import './index.css';
// import Chat from './pages/Chat';
import { BrowserRouter as Router } from 'react-router-dom';
// import ChatContainer from './components/chats/ChatContainer';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import Loader from './components/Loader';
import { AuthContext } from './context/AuthContext';

function App() {
  const {token,login,logout,userId,username,ready} = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token,login,logout,userId,username,isAuthenticated
    }}>
      <Router>
            {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
