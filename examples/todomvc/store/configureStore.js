import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f
  const store = createStore(rootReducer, initialState, devtools)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
