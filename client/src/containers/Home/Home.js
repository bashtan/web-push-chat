import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

import Messages from '../../components/Messages/Messages'
import PostMessage from '../../components/PostMessage/PostMessage'
import { Wrapper, Header } from './Style'

@inject("store") @observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.onPostMessage = this.onPostMessage.bind(this);
  }

  onPostMessage({message, user}){
    this.store.postMessage({sender: user, text: message});
  }

  render() {
    const { messages, totalMessages, allowMessages } = this.store;

    return (
      <Wrapper>
        <Header>Web chat by PUSH API[through Firebase]</Header>
        <Header>{`Total messages: ${totalMessages}`}</Header>
        <Header>{`Push messages status: ${allowMessages}`}</Header>
        <PostMessage onPostMessage={this.onPostMessage}/>
        <Messages messages={messages}/>
      </Wrapper>
    );
  }
}
