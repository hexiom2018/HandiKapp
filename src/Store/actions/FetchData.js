import actionTypes from '../Constant/Constant'
import firebase from '../../config/Firebase'

var db = firebase.database()

export function FetchPlaces(){
    return dispatch =>{
        db.ref('places').on('child_added' , snapShot =>{
            console.log(snapShot.val());
            
        })
    }
}