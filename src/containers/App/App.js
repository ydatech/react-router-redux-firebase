import React, { Component, PropTypes } from 'react'

// Components
import Navbar from '../Navbar/Navbar'

// Themeing/Styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Theme from '../../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './App.css'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends Component {


  static propTypes = {
    children: PropTypes.object
  }


  render() {
    console.log(this.props.router)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
        <div className='App'>
          <Navbar router={this.props.router} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
