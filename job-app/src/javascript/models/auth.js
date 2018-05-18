import {firebaseAuth, googleProvider} from "../firebase";

export function loginWithGoogle() {
    return firebaseAuth().signInWithRedirect(googleProvider);
}

// function loginWithFirebase(provider) {
//     return firebaseAuth().signInWithRedirect(provider);
// }
