import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
    { id: 5, title: "Task 5", completed: false }
];

// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
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
const { update, remove } = actions;

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
