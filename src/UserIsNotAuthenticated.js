import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { helpers } from 'react-redux-firebase'
import { routerActions } from 'react-router-redux'
const { pathToJS } = helpers

export const UserIsNotAuthenticated = UserAuthWrapper({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    allowRedirectBack: false,
    failureRedirectPath: '/',
    authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({ firebase }) => pathToJS(firebase, 'isInitializing') !== true,
    predicate: auth => auth === null,
    redirectAction: routerActions.replace
})

export default UserIsNotAuthenticated