import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

import Registration from '../../components/Registration/Registration'
import Login from '../../components/Login/Login'
import Messages from '../../components/Messages/Messages'
import PostMessage from '../../components/PostMessage/PostMessage'
import { Wrapper, Header } from './Style'

@inject(['store']) @observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = {
      messages: [{
        text: "Hello",
        sender: "user1"
      }, {
        text: "Hi",
        sender: "user2"
      }, {
        text: "By",
        sender: "user3"
      }
      ]
    };
  }

  clickPush() {
  }

  render() {
    const {messages} = this.state;
    return (
      <Wrapper>
        <Header>Web chat by PUSH API[through Firebase]</Header>
        <Registration/>
        <Login/>
        <Messages messages={messages}/>
        <PostMessage/>
      </Wrapper>
    );
  }
}
