import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

let socket = io('http://localhost:5001')
console.log('connected: ' + socket.connected)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messageField: "",
      username: "Anoynmous",
      tmpUsername: "",
      history: []
    };
    //Listen on new_message
  socket.on("new_message", (data) => {
    console.log("got server message by " + data.username +": " + data.message );
    this.appendMessage(data.message);
  })
  }

  componentDidMount() {
    console.log('componentDidMount()');
  }

  render() {
    return (
      <div>
      <header>
      <h1>Super Chat</h1>
      </header>

      <section>
      <div id="change_username">
        <input id="username" type="text" onChange={this.handleUsernameChange}/>
        <button id="send_username" type="button" onClick={this.sendUsername}>Change username</button>
      </div>
    </section>
    <section id="input_zone"> 
      <input id="message" className="vertical-align" onChange={this.handleMessageChange} type="text" />
      <button id="send_message" className="vertical-align" onClick={this.sendMessage} type="button" >Send</button>
    </section>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    </div>
    )
  }

  appendMessage = (newMessage) => {
    console.log('append: ' + newMessage);
    this.setState({
      history : this.state.history.concat(newMessage)
    })
  }

  handleUsernameChange = (input) => {
    this.setState({
      tmpUsername: input.target.value
    });
  }

  handleMessageChange = (input) => {
    this.setState({
      messageField: input.target.value
    });
  }

  sendUsername = () => {
    this.setState({
      username: this.state.tmpUsername,
      tmpUsername: ""
    });
    console.log('username changed to ' + this.state.username)
  }

  sendMessage = () => {
    console.log("SendButton: " + this.state.messageField);
    socket.emit('new_message', {username: this.state.username ,message : this.state.messageField});
  }



}

export default App;
