import React, { Component, PropTypes } from 'react'
import './Navbar.css'
import { Link } from 'react-router'
// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const stockPhotoUrl = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
const originSettings = { horizontal: 'right', vertical: 'bottom' }
const buttonStyle = { color: 'white' }
const avatarSize = 32

// redux/firebase
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { pathToJS } = helpers

@firebaseConnect()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Navbar extends Component {

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object
  }


  render() {
    const { account, router, firebase } = this.props
    console.debug('account data', account)

    const iconButton = (
      <IconButton>
        <Avatar
          className='Navbar-Avatar'
          src={account && account.photoUrl ? account.photoUrl : stockPhotoUrl}
          size={avatarSize}
        />
      </IconButton>
    )

    const mainMenu = (
      <div className='Navbar-Main-Menu'>
        <FlatButton
          label='Login'
          style={buttonStyle}
          onClick={() => router.push('/login')}
        />
      </div>
    )

    const rightMenu = account && account.email ? (

      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText='Account'
          value='account'
          onClick={() => router.push('/account')}
        />
        <MenuItem
          primaryText='Sign out'
          value='logout'
          onClick={() => firebase.logout()}
        />
      </IconMenu>

    ) : mainMenu

    return (

      <AppBar
        title={
          <Link to='/' style={buttonStyle}>
            Employee Advocate
          </Link>
        }

        iconElementRight={rightMenu}
        onLeftIconButtonTouchTap={() => router.push('/content')}
      />
    )
  }
}
