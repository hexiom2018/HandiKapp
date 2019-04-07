import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'

var db = firebase.database()


export function userAuth() {
    return dispatch => {

        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var uid = user.uid;
                    // dispatch({ type: actionTypes.LOADER, payload: true })

                    db.ref('user').on('child_added', (snapShot) => {
                        if (snapShot.val().userUid === uid) {
                            dispatch({ type: actionTypes.USER, payload: snapShot.val() })
                        }
                    })

                    db.ref('user').on('child_changed', (snapShot) => {
                        if (snapShot.val().userUid === uid) {
                            dispatch({ type: actionTypes.USER, payload: snapShot.val() })
                        }
                    })

                    db.ref('vehicle').on('child_added', (snapShot) => {
                        if (snapShot.val().userUid === uid) {
                            dispatch({ type: actionTypes.VEHICLE, payload: snapShot.val() })
                        }
                    })

                    db.ref('vehicle').on('child_changed', (snapShot) => {
                        if (snapShot.val().userUid === uid) {
                            dispatch({ type: actionTypes.VEHICLE, payload: snapShot.val() })
                        }
                    })
                    resolve()
                }
                else {
                    reject()
                    // dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                    // dispatch({ type: actionTypes.ROLE, payload: 'user' })
                }
            });
        })
    }
}



export function Action(Email, Password) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(Email, Password)
                .then((success) => {
                    console.log(success);
                    resolve()
                })
                .catch((error) => {
                    reject()
                })
        })
    }
}


export function UserSignUp(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            const email = obj.email
            const password = obj.password
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                let data = {
                    email,
                    mobile: obj.number,
                    handicapParkingCard: obj.disabledPark,
                    userUid: user.user.uid
                }
                let vehicle = {
                    reg: obj.register,
                    type: obj.radio,
                    userUid: user.user.uid
                }
                db.ref('/user').push(data)
                db.ref('/vehicle').push(vehicle)
                resolve()
                // dispatch({ type: ActionTypes.AUTH, payload: true })

            })
                .catch((err) => {
                    console.log(err)
                    reject()
                })
        })
    }
}


export function UpdateUserProfile(items, userUid) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.ref('user').on('child_added', (snapShot) => {
                db.ref('user/' + snapShot.key).update({
                    mobile: items.number,
                    handicapParkingCard: items.disabledPark,
                })
            })

            db.ref('vehicle').on('child_added', (snapShot) => {
                db.ref('vehicle/' + snapShot.key).update({
                    reg: items.register,
                    type: items.radio,
                })
            })
        })
    }
}


export function AddParkingSpace(data, user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.ref('/places/' + user).set(data).then(() => {
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
}


export function GetParkingSpace(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.ref('/places/' + user).on('value', (snapShot) => {
                if (snapShot.val()) {
                    // console.log(snapShot.val(), 'mil gay haiu')
                    dispatch({ type: actionTypes.PARKINGSPACE, payload: snapShot.val() })
                } else {
                    console.log('nhi ha bhai')
                }
            })
        })
    }
}



//LOgOut

export function Log_Out() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut()
                .then((success) => {
                    console.log(success);
                    resolve()
                })
                .catch((error) => {
                    reject()
                })
        })
    }
}