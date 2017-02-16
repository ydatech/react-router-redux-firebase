import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
    firebase,
    routing
})

export default rootReducer