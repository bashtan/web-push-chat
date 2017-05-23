import { observable, action } from 'mobx';
import axios from 'axios';
import * as firebase from 'firebase';


class AppState {
  @observable pushAvailable = false;
  @observable pushEnabled = false;
  app = firebase.initializeApp({
    messagingSenderId: "357322723210"
  });

  constructor() {
    this.pushEnabled = false;
    this.pushAvailable = false;
  }

  @action subscribe() {

  }

  sendSubscriptionToServer({ subscription, user, type }) {

  }

  @action unsubscribe() {

  }

  @action initializationState() {
    this.app.messaging().onTokenRefresh(()=> {
      messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed. '+ refreshedToken);
        })
        .catch(err => {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    this.app.messaging().requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        this.getToken()
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });

    this.app.messaging().onMessage(payload => {
      new Notification('Notification!', {
        body: payload.data.message,
      });
    });
  }

  getToken() {
    this.app.messaging().getToken()
      .then(currentToken => {
        if (currentToken) {
          console.log('Got FCM device token:', currentToken);
        } else {
          // Need to request permissions to show notifications.
          this.initializationState();
        }
      })
      .catch(error => {
        console.error('Unable to get messaging token.', error);
      });
  }
}

export default AppState;