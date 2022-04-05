import React, { Component } from 'react';
import '../chat.css';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typedMessage: '',
    };
    this.socket = io.connect('http://codeial.codingninjas.com:5000/');

    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('CONNECTIONS IS ESTABLISH....');
      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NEW_USER IS JOINED.', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  Godown = () => {
    if (
      document
        .getElementsByClassName('chat-container')[0]
        .classList.contains('height-zero')
    ) {
      $('.chat-container').removeClass('height-zero');
    } else {
      $('.chat-container').addClass('height-zero');
    }
  };

  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828906.png"
            alt=""
            height={17}
            onClick={this.Godown}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToprops({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToprops)(Chat);
