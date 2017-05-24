import React, { Component } from 'react';
import {FormWrapper, Header, Field, Button} from '../styled';

export default class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInputUser = this.onInputUser.bind(this);
    this.onInputMessage = this.onInputMessage.bind(this);

    this.state = {message: '', user: ''};
  }

  onInputUser({currentTarget: {value}}){
    this.setState({user: value})
  }

  onInputMessage({currentTarget: {value}}){
    this.setState({message: value})
  }

  onClick(){
    const {onPostMessage} = this.props;
    const {message, user} = this.state;
    onPostMessage({message, user});
  }

  render() {
    const {message, user} = this.state;
    return (
      <FormWrapper>
        <Header>Post message</Header>
        <Field onChange={this.onInputUser} placeholder="Your name"/>
        <Field onChange={this.onInputMessage} placeholder="Your message"/>
        <Button enabled={(message && message.length > 0) && (user && user.length > 0)} onClick={this.onClick}>Submit</Button>
      </FormWrapper>
    );
  }
}
