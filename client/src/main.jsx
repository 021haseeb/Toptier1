import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a25',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1a1a25',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1a1a25',
              },
            },
          }}
        />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

