import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './AuthContext';
import AppContainer from './components/AppContainer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContainer>
        <App />
      </AppContainer>
    </AuthProvider>
  </React.StrictMode>,
)
