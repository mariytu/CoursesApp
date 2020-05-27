import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App'
import './index.css'
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'

const store = configureStore()
// It can be useful to pass initial state into the store here if you're server rendering or initializing you Redux store with data from localStorage, but is usually pass in reducers

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
)
