import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./styles/main.sass";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import firebase from "./config/init-firebase";
import reducers from "./reducers/index.js";

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk.withExtraArgument({ getFirestore })), reduxFirestore(firebase))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
