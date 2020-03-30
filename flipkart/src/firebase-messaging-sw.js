import firebase from 'firebase'
let config = {
   messagingSenderId: "1032903367675"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.onMessage(payload => {
   const title = payload.notification.title;
   console.log('payload', payload.notification.icon);
   const options = {
      body: payload.notification.body,
      icon: payload.notification.icon
   }
   return window.self.registration.showNotification(title, options);
})
messaging.setBackgroundMessageHandler(payload => {
   const title = payload.notification.title;
   console.log('payload', payload.notification.icon);
   const options = {
      body: payload.notification.body,
      icon: payload.notification.icon
   }
   return window.self.registration.showNotification(title, options);
})