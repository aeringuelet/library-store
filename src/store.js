import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAr0f3szWs-vTvtH8emcqBjV2I_yRWqc3Y",
    authDomain: "library-store-51f17.firebaseapp.com",
    databaseURL: "https://library-store-51f17.firebaseio.com",
    projectId: "library-store-51f17",
    storageBucket: "library-store-51f17.appspot.com",
    messagingSenderId: "284510328330",
    appId: "1:284510328330:web:7adba1ca9371f7be4f31f3",
    measurementId: "G-D517DZ5DSL"
}

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

const initialState = {};

const store = createStoreWithFirebase(rootReducer, initialState, composeWithDevTools(
    reactReduxFirebase(firebase)
));

export default store;