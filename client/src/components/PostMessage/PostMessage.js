import React, { Component } from 'react';
import {FormWrapper, Header, Field, Button} from '../styled';

export default class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInput = this.onInput.bind(this);

    this.state = {message: ''};
  }

  onInput({currentTarget: {value}}){
    this.setState({message: value})
  }

  onClick(){
    const {onPostMessage} = this.props;
    const {message} = this.state;

    onPostMessage(message);
  }

  render() {
    const {message} = this.state;
    return (
      <FormWrapper>
        <Header>Post message</Header>
        <Field onChange={this.onInput} placeholder="Input your message"></Field>
        <Button enabled={message && message.length > 0} onClick={this.onClick}>Submit</Button>
      </FormWrapper>
    );
  }
}
