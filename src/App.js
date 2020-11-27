import React, { Component } from 'react'
import './App.css'
import ClimateGraph from './components/climategraph'
import LineGraph from './components/linegraph'

class App extends Component {
   render() {
   return (
      <div className='App'>
        <LineGraph />
        <ClimateGraph />
      </div>
   )
   }
}
export default App