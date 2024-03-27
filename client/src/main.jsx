import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store }from './app/store.js'
import { HashRouter } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter base="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
