import firebase from "firebase";

export function createMessage(name, productLink, email, message) {
    // TODO add firebase method for form submitting
  // return firebase().someAction(name, productLink, email, message);
}

export function registerUser(login, email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}
