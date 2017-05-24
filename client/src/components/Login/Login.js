import React, { Component } from 'react';
import {FormWrapper, Header, Field, Button} from '../styled';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInput = this.onInput.bind(this);

    this.state = {user: ''};
  }

  onInput({currentTarget: {value}}){
    this.setState({user: value})
  }

  onClick(){
    const {onLogin} = this.props;
    const {user} = this.state;

    onLogin(user);
  }

  render() {
    const {user} = this.state;
    return (
      <FormWrapper>
        <Header>Login</Header>
        <Field onChange={this.onInput} placeholder="Input your name"></Field>
        <Button enabled={user && user.length > 0} onClick={this.onClick}>Login</Button>
      </FormWrapper>
    );
  }
}
