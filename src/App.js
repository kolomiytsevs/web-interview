import React, { Component } from 'react'
import axios from 'axios'

import { API_ENDPOINT } from './config'

import Header from './Components/Header/Header'
import Spinner from './Components/Spinner'
import AppData from './AppData'
import AppProvider from './AppProvider'

import './App.scss'
import Body from './Body'

const App = () => (
  <AppProvider>
    <AppProvider.Consumer>
      {({ loading, error, userId, user, availableSlots }) => (
        <div className="app">
          <Header />
          {loading && <Spinner />}
          {error ? (
            <p>We are current experiencing problems, please try again later.</p>
          ) : (
            <Body userId={userId} user={user} availableSlots={availableSlots} />
          )}
        </div>
      )}
    </AppProvider.Consumer>
  </AppProvider>
)

export default App
