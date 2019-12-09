import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/main/App';
// import App from './component/guide/App'
// import { combineReducers } from 'redux';
// import errorReducer from './errorReducer';
// import authReducer from './authReducer';

// export default combineReducers({
//     errors: errorReducer,
//     auth: authReducer
// });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
