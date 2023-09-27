import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDYs3oQfHEQs_5nz9pLe1-qOzWMmKPX-54",
  authDomain: "test-project-eb690.firebaseapp.com",
  projectId: "test-project-eb690",
  storageBucket: "test-project-eb690.appspot.com",
  messagingSenderId: "651850347297",
  appId: "1:651850347297:web:6888519f10bccbd96d8460",
  measurementId: "G-5PLW1LVKT6"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: Function) => {
  return getToken(messaging, {vapidKey: 'BGsdA17-08xpYceNBcEj9FiQVgLkL1Efkk8Lmjw_ee5a8cFEa59fsZD7XcKNJxR4PDjoDIO7oogwJPwZd52gbEY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(currentToken);
      // shows on the UI that permission is required 
    }
  }).catch((err: any) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});