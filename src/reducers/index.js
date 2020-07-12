import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import main from "./main";

const allReducers = combineReducers({
  main,
  firestore: firestoreReducer
});

export default allReducers;
