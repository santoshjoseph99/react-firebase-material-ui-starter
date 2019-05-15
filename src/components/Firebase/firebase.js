import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBa5hmLy1FIa1QmwEGKmWnIaWBYvrO-aBo",
  authDomain: "blackjacktracker-37996.firebaseapp.com",
  databaseURL: "https://blackjacktracker-37996.firebaseio.com",
  projectId: "blackjacktracker-37996",
  storageBucket: "blackjacktracker-37996.appspot.com",
  messagingSenderId: "719500530307",
  appId: "1:719500530307:web:81eb8fd402437697"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;