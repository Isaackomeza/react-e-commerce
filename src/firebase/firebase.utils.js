import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth'; 

const config = {
        apiKey: "AIzaSyC2GQgkc3wYqm2dpPqM4zVepAMNbxfumNY",
        authDomain: "e-commerce-db-73feb.firebaseapp.com",
        databaseURL: "https://e-commerce-db-73feb.firebaseio.com",
        projectId: "e-commerce-db-73feb",
        storageBucket: "e-commerce-db-73feb.appspot.com",
        messagingSenderId: "365481123783",
        appId: "1:365481123783:web:b3cadf0424e9f0cfb143e2"      
    }

    firebase.initializeApp(config);

    export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
      
        const userRef = firestore.doc(`users/${userAuth.uid}`);
      
        const snapShot = await userRef.get();
      
        if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
      
        return userRef;
      };

    export const auth = firebase.auth()
    export const firestore = firebase.firestore()

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    export const signInWithGoogle = () => auth.signInWithPopup(provider);

    export default firebase;