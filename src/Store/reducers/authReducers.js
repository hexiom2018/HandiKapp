import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    UID: null,
    USER: null,
    VEHICLE: null,
    PLACES: null,
    CURRENTADDRESS: null,
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
        case 'PLACES':
            return ({
                ...states,
                PLACES: action.payload
            })
        case 'CURRENTADDRESS':
            return ({
                ...states,
                CURRENTADDRESS: action.payload
            })
        default:
            return states;
    }
}