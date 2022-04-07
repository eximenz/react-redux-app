import { createSlice } from "@reduxjs/toolkit";
import todosServise from "../services/todos.service";

const initialState = [];

// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        set(state, action) {
            return action.payload;
        },
        update(state, action) {
            const elementIndex = state.findIndex(
                (el) => el.id === action.payload.id
            );
            state[elementIndex] = {
                ...state[elementIndex],
                ...action.payload
            };
        },
        remove(state, action) {
            return state.filter((el) => el.id !== action.payload.id);
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
const { update, remove, set } = actions;

export const getTasks = () => async (dispatch) => {
    try {
        const data = await todosServise.fetch();
        dispatch(set(data))
        console.log(data);
    } catch (error) {}
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
