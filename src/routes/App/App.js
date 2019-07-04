import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from '../Page'

function App () {
  return (
    <Router basename='/insights-dashboard/'>
      <div>
        <Route path='/' exact component={Page} />
      </div>
    </Router>
  )
}

export default App
