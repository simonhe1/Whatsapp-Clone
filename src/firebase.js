import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCGbBKrm744tjxqNd0z_tTcNpRvCKmO370",
  authDomain: "whatsapp-clone-670e6.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-670e6.firebaseio.com",
  projectId: "whatsapp-clone-670e6",
  storageBucket: "whatsapp-clone-670e6.appspot.com",
  messagingSenderId: "1096485402364",
  appId: "1:1096485402364:web:1355eab15d269f5a234979",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FBProvider = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage();

export { auth, GoogleProvider, FBProvider, storage };
export default db;
