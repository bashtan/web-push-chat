import React, { Component } from 'react';
import {FormWrapper, Header, Field, Button} from '../styled';

export default class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){}

  render() {
    return (
      <FormWrapper>
        <Header>Post message</Header>
        <Field placeholder="Input your message"></Field>
        <Button enabled={true} onClick={this.onClick}>Submit</Button>
      </FormWrapper>
    );
  }
}
