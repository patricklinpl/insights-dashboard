import React from 'react'
import logo from '../../assets/images/logo.svg'
import './App.css'
import LaunchEvent from '../../components/LTI/LaunchEvent'

function Page () {
  return (
    <div className='App'>
      <LaunchEvent render={() => ''} />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default Page
