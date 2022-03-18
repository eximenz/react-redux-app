import React from "react";
import ReactDOM from "react-dom";

function createStore(initialState) {
    let state = initialState;

    function getState() {
        return state;
    }
    function dispatch(action) {
        if (action.type === "task/completed") {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex].completed = true;
            state = newArray;
            console.log(state);
        }
    }

    return { getState, dispatch };
}
const store = createStore([{ id: 1, descriptiob: "Task 1", completed: false }]);

const App = (params) => {
    console.log(store.getState());
    return (
        <>
            <h1>App</h1>
            <button
                onClick={() =>
                    store.dispatch({
                        type: "task/completed",
                        payload: { id: 1 }
                    })
                }
            >
                Complete
            </button>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
