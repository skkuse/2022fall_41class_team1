import { combineReducers } from "redux";
import user from "./userReducer";
import changeStatus from "../_actions/changeStatus";

const rootReducer = combineReducers({
  user,
  changeStatus,
});

export default rootReducer;