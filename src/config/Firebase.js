import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCARTwEqawH7N7PCoxA-KeWuCH_NqgMZWc",
    authDomain: "handicapapp-52992.firebaseapp.com",
    databaseURL: "https://handicapapp-52992.firebaseio.com",
    projectId: "handicapapp-52992",
    storageBucket: "handicapapp-52992.appspot.com",
    messagingSenderId: "102165340915"
};
firebase.initializeApp(config);

export default firebase