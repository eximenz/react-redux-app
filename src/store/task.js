import { createAction, createSlice } from "@reduxjs/toolkit";
import todosServise from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true};

// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            };
        },
        remove(state, action) {
            return state.entities.filter((el) => el.id !== action.payload.id);
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            state.isLoading = false;
        }
    }
});

// const taskReduser = createReducer(initialState, (builder) => {
//     builder
//         .addCase(update, (state, action) => {
//             const elementIndex = state.findIndex(
//                 (el) => el.id === action.payload.id
//             );
//             state[elementIndex] = {
//                 ...state[elementIndex],
//                 ...action.payload
//             };
//         })
//         .addCase(remove, (state, action) => {
//             return state.filter((el) => el.id !== action.payload.id);
//         });
// });

const { actions, reducer: taskReduser } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed } = actions;

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosServise.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
    return remove({ id });
}

export default taskReduser;
