import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './auth/AuthContext.tsx';
import AppContainer from './components/AppContainer.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import MainContainer from './components/MainContainer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContainer>
        <Router>
          <Navbar />
          <MainContainer>
            <App />
          </MainContainer>
        </Router>
      </AppContainer>
    </AuthProvider>
  </React.StrictMode>,
)
