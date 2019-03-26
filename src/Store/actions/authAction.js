import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'
require('firebase/firestore')
var db = firebase.firestore()


export function Action(Email, Password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((success) => {
                console.log(success);
                
            })
            .catch((error) => {
                alert('Invalid Email & Password')
                console.log('something went wrong', error)
            })
    }
}


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