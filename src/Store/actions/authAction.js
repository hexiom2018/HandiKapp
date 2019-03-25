import actionTypes from '../Constant/Constant'
import firebase from '../../Config/firebase/index'
require('firebase/firestore')
var db = firebase.firestore()


// export function current_User(currentUser) {
//     return dispatch => {
//         const UID = currentUser.uid
//         var arr = [];
//         dispatch(
//             { type: actionTypes.UID, payload: UID }
//         )

//         db.collection('UserData').where('UID', '==', UID).onSnapshot((querySnapshot) => {
//             querySnapshot.docChanges().forEach((docs) => {
//                 if (docs.type === 'added') {
//                     dispatch(
//                         { type: actionTypes.USER, payload: docs.doc.data() }
//                     )
//                 }
//                 if (docs.type === 'modified') {
//                     dispatch(
//                         { type: actionTypes.USER, payload: docs.doc.data() }
//                     )
//                 }
//             })
//         })

//         db.collection('UserData').onSnapshot((querySnapshot) => {
//             querySnapshot.docChanges().forEach((docs) => {
//                 if (docs.type === 'added') {
//                     if (docs.doc.data().UID !== UID) {
//                         arr.push(docs.doc.data())
//                         dispatch(
//                             { type: actionTypes.ALLUSER, payload: arr }
//                         )
//                     }
//                 }
//             })
//         })
//     }
// }