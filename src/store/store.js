import { createStore, combineReducers, applyMiddleware }
 from "redux";
import thunk from "redux-thunk";
import { reducer as TodosReducer } from "../features/Todos/reducer";


const rootReducer = combineReducers({
  todoState: TodosReducer,
});

const logger1 = (store) => (next) => (action) => {
  console.log("inside 1");
  next(action);
};

export const store = createStore(rootReducer, applyMiddleware(thunk));

console.log("entire store", store.getState());
