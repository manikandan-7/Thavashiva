import firebase from 'firebase';


export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyD-cND4yHeZVxO_vk-y_aQrWgYRrWIMkOE",
    authDomain: "articles-65ebb.firebaseapp.com",
    databaseURL: "https://articles-65ebb.firebaseio.com",
    projectId: "articles-65ebb",
    messagingSenderId: "1062407524656",
    storageBucket: "articles-65ebb.appspot.com",
    appId: "1:1032903367675:web:6488bc0a14b6e121ba895e",
    measurementId: "G-XV5683FKE9" 
  });

 
//   navigator.serviceWorker.addEventListener("message", (message) =>
//   alert(message)
// );
  // use other service worker
  // navigator.serviceWorker
  //   .register('/my-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
}

export const askForPermissionToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    const response = await fetch('http://localhost:9000/updatepushtoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:localStorage.getItem("current"),
                    token:token
                
                })
            });
            const body = await response.text();
            console.log(body)
    

    return token;
  } catch (error) {
    console.error(error);
  }
}