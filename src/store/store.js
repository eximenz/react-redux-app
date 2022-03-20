import { createStore } from "redux";
import taskReduser from "./task";


function configureStore() {
    return createStore(taskReduser);
}

export default configureStore;
