import { observable, action, computed } from 'mobx';
import axios from 'axios';
import * as firebase from 'firebase';
import {v4} from 'uuid';

const DENIED = 'DENIED';
const ALLOWED = 'ALLOWED';
const UNKNOWN = 'UNKNOWN';
const ERROR = 'ERROR';

class AppState {
  @observable pushAvailable = false;
  @observable pushEnabled = false;
  @observable messages = [];
  @observable users = [];
  @observable allowMessages = UNKNOWN;

  app = firebase.initializeApp({
    messagingSenderId: "357322723210"
  });

  constructor() {
    this.pushEnabled = false;
    this.pushAvailable = false;
    this.messages = [];
  }

  @action subscribe() {

  }

  @action postMessage({sender, text}){
    this.messages.push({
      id: v4(),
      sender,
      text
    });
  }

  @computed get totalMessages() {
    return this.messages.length;
  }

  @action getMessages() {
    this.messages = [{
      id: v4(),
      text: "Hello",
      sender: "user1"
    }, {
      id: v4(),
      text: "Hi",
      sender: "user2"
    }, {
      id: v4(),
      text: "By",
      sender: "user3"
    }];
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

    this.app.messaging().onMessage(payload => {
      new Notification('Notification!', {
        body: payload.data.message,
      });
    });

    this.requestPermission();
  }

  requestPermission(){
    return this.app.messaging().requestPermission()
      .then(() => {
        this.allowMessages = ALLOWED;
        this.getToken()
      })
      .catch(({code = 'unknown'}) => {
        if(code === 'messaging/permission-blocked')
          this.allowMessages = DENIED;
        else
          this.allowMessages = ERROR;
      });
  }

  getToken() {
    this.app.messaging().getToken()
      .then(currentToken => {
        if (currentToken) {
          console.log('Got FCM device token:', currentToken);
        } else {
          console.log('Need to request permissions');
          // Need to request permissions to show notifications.
          this.requestPermission();
        }
      })
      .catch(error => {
        console.error('Unable to get messaging token.', error);
      });
  }
}

export default AppState;
