import {combineReducers} from 'redux'


export function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

export function mostRecentGeneralUrl(
    state = {
        shortUrl: "",
    },
    action
) {
    switch (action.type) {
        case 'RECEIVE_GENERAL_SHORT_URL':
            return Object.assign({}, state, {
                shortUrl: action.shortUrl,
            });
        default:
            return state
    }
    // return state;
}

function loading(state = false, action) {
    switch (action.type) {
        case 'RECEIVE_GENERAL_SHORT_URL':
        case 'REQUEST_GENERAL_SHORT_URL':
            return true;
        default:
            return state;
    }

}


export default combineReducers({
    inFlight,
    mostRecentGeneralUrl,
    loading,
});