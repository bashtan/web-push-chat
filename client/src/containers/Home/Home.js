import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

import Registration from '../../components/Registration/Registration'
import Login from '../../components/Login/Login'
import Messages from '../../components/Messages/Messages'
import PostMessage from '../../components/PostMessage/PostMessage'
import {Wrapper, Header } from './Style'

@inject(['store']) @observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  clickPush(){
  }

  render() {
    return (
      <Wrapper>
        <Header>Web chat by PUSH API[through Firebase]</Header>
        <Registration/>
        <Login/>
        <Messages/>
        <PostMessage/>
      </Wrapper>
    );
  }
}
