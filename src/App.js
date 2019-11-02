import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFns from '@date-io/date-fns'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'

import theme from './theme'
import Routes from './Routes'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache: new InMemoryCache()
})

function App () {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFns}>
          <Router basename='/'>
            <Routes />
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
