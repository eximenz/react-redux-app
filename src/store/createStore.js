export function createStore(reduser, initialState) {
    let state = initialState;
    let listeners = [];

    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reduser(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }
    function subscribe(listener) {
        listeners.push(listener);
    }

    return { getState, dispatch, subscribe };
}
