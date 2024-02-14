import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Login from './Login';
import { ContextProvider } from './contexts/ContextProvider';

const Root = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      <ContextProvider>
        {isLoggedIn ? <App /> : <Login onLogin={() => setLoggedIn(true)} />}
      </ContextProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
