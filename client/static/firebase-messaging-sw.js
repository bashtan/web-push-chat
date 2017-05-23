// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '357322723210'
});

firebase.messaging().setBackgroundMessageHandler(payload => {
  // Customize notification here
  const notificationTitle = 'Background Notification!';
  const notificationOptions = {
    body: payload.data.message
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
