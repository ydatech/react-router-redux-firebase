import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { helpers } from 'react-redux-firebase'
const { pathToJS } = helpers
import { routerActions } from 'react-router-redux'
//import { CircularProgress } from 'material-ui/Progress';
import CircularProgress from 'material-ui/CircularProgress'

export const UserIsAuthenticated = UserAuthWrapper({
    wrapperDisplayName: 'UserIsAuthenticated',
    authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({ firebase }) => pathToJS(firebase, 'isInitializing') === true,
    LoadingComponent: CircularProgress,
    redirectAction: routerActions.replace,
})
/*
(newLoc) => (dispatch) => {

        browserHistory.replace(newLoc)
        dispatch({
            type: 'UNAUTHED_REDIRECT',
            payload: { message: 'You must be authenticated.' },
        })
    }
    */
export default UserIsAuthenticated