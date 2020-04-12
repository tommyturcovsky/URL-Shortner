import {combineReducers} from 'redux'


export function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

export function mostRecentGeneralUrl(
    state = {
        shortUrl: ""
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
}

export function mostRecentCustomUrl(
    state = {
        shortUrlCustom: ""
    },
    action
) {
    console.log("reducer: " + action.shortUrlCustom)
    switch (action.type) {
        case 'RECEIVE_CUSTOM_SHORT_URL':
            return Object.assign({}, state, {
                shortUrlCustom: action.shortUrlCustom,
            });
        case 'CUSTOM_URL_DELETED':
            return Object.assign({}, state, {
                shortUrlCustom: undefined
            })
        default:
            return state
    }
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
    mostRecentCustomUrl,
    loading,
});