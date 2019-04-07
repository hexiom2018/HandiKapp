import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'

var db = firebase.database()

// Fetach places data
// export function FetchPlaces() {
//     return dispatch => {
//         var placesArr = [];
//         db.ref('places').on('child_added', snapShot => {
//             placesArr.push(snapShot.val())
//             if (placesArr && placesArr.length) {
//                 dispatch(
//                     { type: actionTypes.PLACES, payload: placesArr }
//                 )
//             }
//         })
//     }
// }

// Current Address
export function currentAddress(obj) {
    return dispatch => {
        dispatch(
            { type: actionTypes.CURRENTADDRESS, payload: obj }
        )
    }
}