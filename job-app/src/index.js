import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

// const middleware = [ thunk ]
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )

render(
  // <Provider store={store}>
  	<BrowserRouter>
    	<App />
    </BrowserRouter>
  // </Provider>
  ,
  document.getElementById('root')
)
//////////////
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// // import registerServiceWorker from './registerServiceWorker';

// // ReactDOM.render(<App />, document.getElementById('root'));
// // registerServiceWorker();
// import { BrowserRouter } from 'react-router-dom'


// ReactDOM.render((
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// ), document.getElementById('root'));
