import React, { Component, PropTypes } from 'react'

// Components
import LoginForm from '../../components/LoginForm/LoginForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

// Styling
import './Login.css'

// redux/firebase
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { pathToJS } = helpers

@firebaseConnect()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)

export default class Login extends Component {

  static propTypes = {
    profile: PropTypes.object,
    authError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  state = {
    message: '',
    messageType: 'error'
  }

  componentWillMount() {
    const { profile, router, location } = this.props
    if (profile && profile.email) {

      router.push(location && location.query && location.query.redirect ? location.query.redirect : '/')
    }
  }
  // Redirect when logged in
  componentWillReceiveProps({ profile, router, location }) {

    if (profile && profile.email) {

      router.push(location && location.query && location.query.redirect ? location.query.redirect : '/')
    }
  }

  handleLogin = (loginData) => {
    this.setState({ snackCanOpen: true })
    const {firebase, router, location} = this.props
    firebase.login(loginData)
  }

  providerLogin = (provider) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login({ provider, type: 'redirect' })
  }

  render() {
    const { profile, authError, router } = this.props
    console.debug('auth error', authError)
    // Loading spinner
    if (profile && profile.isFetching) {
      return (
        <div className='Login'>
          <div className='Login-Progress'>
            <CircularProgress mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className='Login'>
        <Paper className='Login-Panel'>
          <LoginForm onLogin={this.handleLogin} />
        </Paper>
        {
          authError && authError.message
            ? <Snackbar
              open={authError && !!authError.message}
              message={authError.message || 'Error'}
              action='close'
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            : null
        }
      </div>
    )
  }
}
