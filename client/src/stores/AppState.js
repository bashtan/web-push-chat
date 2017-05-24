import { observable, action, computed } from 'mobx';
import axios from 'axios';
import * as firebase from 'firebase';
import { v4 } from 'uuid';

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
  @observable currentToken = '';

  app = firebase.initializeApp({
    messagingSenderId: "357322723210"
  });

  constructor() {
    this.pushEnabled = false;
    this.pushAvailable = false;
    this.messages = [];
    this.users = [];
    this.currentToken = '';
    this.allowMessages = UNKNOWN;
  }

  @action postMessage({ sender, text }) {
    axios.post('/api/message', {
      token: this.currentToken,
      sender: sender,
      message: text
    })
      .then((res) => {
        console.log('success send', res);
      })
      .catch(e => {
        console.log('error send', e);
      });


    // this.messages.push({
    //   id: v4(),
    //   sender,
    //   text
    // });
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
    }
    ];
  }

  sendSubscriptionToServer({ subscription, user, type }) {

  }

  @action unsubscribe() {

  }

  @action initializationState() {
    this.app.messaging().onTokenRefresh(() => {
      messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed. ' + refreshedToken);
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

  requestPermission() {
    return this.app.messaging().requestPermission()
      .then(() => {
        this.allowMessages = ALLOWED;
        this.getToken()
      })
      .catch(({ code = 'unknown' }) => {
        if (code === 'messaging/permission-blocked')
          this.allowMessages = DENIED;
        else
          this.allowMessages = ERROR;
      });
  }

  getToken() {
    this.app.messaging().getToken()
      .then(token => {
        if (token) {
          console.log('Token: ', token);
          //send token to server
          axios.post('/api/subscribe', {
            token
          })
            .then(({ data: { users = [] } }) => {
              this.currentToken = token;
              this.users = users;
            })
            .catch(e => {
              this.allowMessages = ERROR;
              console.error('Error subscribe', e);
            });
        } else {
          console.log('Need to request permissions');
          // Need to request permissions to show notifications.
          this.requestPermission();
        }
      })
      .catch(error => {
        this.allowMessages = ERROR;
        console.error('Unable to get messaging token.', error);
      });
  }
}

export default AppState;
