import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";
import configureStore from "./store/store";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createTask
} from "./store/task";

const store = configureStore();

const App = (params) => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    // const completeTask = (taskId) => {
    //     dispatch((dispatch, getState) => {
    //         console.log(dispatch);
    //         console.log(getState);
    //         dispatch(taskCompleted(taskId));
    //     });
    // };
    const addNewTask = () => {
        dispatch(
            createTask({ userId: 1, title: "SomeNew Task", completed: false })
        );
    };

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h1>App</h1>
            <button onClick={() => addNewTask()}>Add task</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>{" "}
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change Title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
