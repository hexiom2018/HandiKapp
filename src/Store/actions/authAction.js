import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'

var db = firebase.database()



export function Action(Email, Password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((success) => {
                console.log(success);
                resolve()

                 
            })
            .catch((error) => {
                // alert('Invalid Email & Password')
                // console.log('something went wrong', error)
                reject()
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
                    userUid: user.user.uid
                }
                let vehicle = {
                    reg: obj.register,
                    type: obj.radio,
                    disabled: obj.disabledPark
                }
                db.ref('/user').push(data)
                db.ref('/vehicle').push(vehicle)
                resolve()
            })
                .catch((err) => {
                    console.log(err)
                    reject()
                })
        })
    }
}

