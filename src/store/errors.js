import { createSlice } from "@reduxjs/toolkit";

const initialState = { entities: [] };

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        set(state, action) {
            state.entities.push(action.payload);
            state.isLoading = false;
        }
    }
});

const { actions, reducer: errorReduser } = errorSlice;

const { set } = actions;
export const setError = (message) => (dispatch) => {
    dispatch(set(message));
};

export default errorReduser;
