import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    UID: null,
    USER: null,
    VEHICLE: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UID':
            return ({
                ...states,
                UID: action.payload
            })
        case 'USER':
            return ({
                ...states,
                USER: action.payload
            })
        case 'VEHICLE':
            return ({
                ...states,
                VEHICLE: action.payload
            })
        default:
            return states;
    }
}