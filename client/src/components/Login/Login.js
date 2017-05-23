import React, { Component } from 'react';
import {FormWrapper, Header, Field, Button} from '../styled';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){}

  render() {
    return (
      <FormWrapper>
        <Header>Login</Header>
        <Field placeholder="Input your name"></Field>
        <Button onClick={this.onClick}>Login</Button>
      </FormWrapper>
    );
  }
}
