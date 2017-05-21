
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import {reducer as formReducer} from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import promisesMiddleware from '../middleware/promises';


const logger = createLogger();
const configureStore = (preloadedState) => {
  const store = createStore(
    reducers,
    // formReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(logger, thunk, promisesMiddleware)),
  );

  if (module.hot) {
  // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;

// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod');
// } else {
//   module.exports = require('./configureStore.dev');
// }
