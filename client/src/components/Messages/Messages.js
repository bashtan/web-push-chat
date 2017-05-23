import React, { Component } from 'react';


export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {messages} = this.props;
    return (
      <div>
        <div>Messages</div>
        <div>{messages ? messages.map(({text, sender})=><div key={sender+text}>{`${sender}: ${text}`}</div>): null}</div>
      </div>
    );
  }
}
