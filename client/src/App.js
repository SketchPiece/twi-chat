import React from 'react';
import './index.css';
// import Chat from './pages/Chat';
import { BrowserRouter as Router } from 'react-router-dom';
// import ChatContainer from './components/chats/ChatContainer';
import { useRoutes } from './routes';

function App() {
  const isAuthenticated = true;
  const routes = useRoutes(isAuthenticated);

  return (
      // <Chat />
      <Router>
            {routes}
      </Router>
  );
}

export default App;
