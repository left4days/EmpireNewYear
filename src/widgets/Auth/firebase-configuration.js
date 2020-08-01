import firebase from "firebase";

export function registerUser(login, email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOutUser() {
  return firebase.auth().signOut();
}

export function resetUser(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}
