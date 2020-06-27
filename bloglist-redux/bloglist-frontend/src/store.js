import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import nofificationReducer from "./reducers/notificationReducer";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: nofificationReducer,
  loggedInUser: loggedInUserReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
