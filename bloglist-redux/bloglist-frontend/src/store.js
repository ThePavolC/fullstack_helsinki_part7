import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import nofificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: nofificationReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
