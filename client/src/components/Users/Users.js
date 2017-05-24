import React, { Component } from 'react';
import {User} from './Style';

export default class Users extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {users} = this.props;
    return (
      <div>
        <div>Active users</div>
        <div>{users ? users.map(({id, name, token})=><User key={id}>{`${name}: ${token}`}</User>): null}</div>
      </div>
    );
  }
}
