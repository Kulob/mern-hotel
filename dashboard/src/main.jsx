import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { DarkModeContextProvider } from './context/darkModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </>,
)
