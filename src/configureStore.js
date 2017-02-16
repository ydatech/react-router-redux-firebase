
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase } from 'react-redux-firebase';
import rootReducer from './reducers';
import { getFirebase } from 'react-redux-firebase';
import { firebase as fbConfig } from './config'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

export default function configureStore(initialState, history) {
    /*
    const createStoreWithMiddleware = compose(
        reactReduxFirebase(fbConfig,
            {
                userProfile: 'users',
                enableLogging: false
            }
        ),
    )(createStore)
    const store = createStoreWithMiddleware(rootReducer, initialState)
    */
    const routingMiddleware = routerMiddleware(history)
    const logger = createLogger()
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            process.env.NODE_ENV === 'production'
                ?
                applyMiddleware(
                    thunk.withExtraArgument(getFirebase), // Pass getFirebase function as extra argument
                    routingMiddleware
                )
                :
                applyMiddleware(
                    thunk.withExtraArgument(getFirebase), // Pass getFirebase function as extra argument
                    routingMiddleware,
                    logger

                ),
            reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false })
        )
    )

    return store
}
