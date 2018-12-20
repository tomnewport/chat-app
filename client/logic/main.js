import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

function displayMessage(message){
  return <section key = {message.time} className = "message">
<h2>{message.sender}</h2>
<h3><Moment fromNow>{message.time}</Moment></h3>
<p>{message.message}</p>

  </section>;
}
class MessageSender extends Component{
  render(){return <section className = "new-message" >
    <input id = "sender-name"></input>
    <textarea id = "message"></textarea>
    <button onClick = {
      function(){
        const sendername = document.getElementById("sender-name").value;
        const messagetosend = document.getElementById("message").value;
        const timemessagesent = new Date().toISOString();
        console.log(sendername, messagetosend,timemessagesent)
        fetch('http://tnewport-mac.oxfordnanolabs.local:8000/messages',{
          method :"POST",
          mode: "cors",
          headers : {"Content-Type":"application/json"},
          body : JSON.stringify({
            sender:sendername,
            message:messagetosend,
            time:timemessagesent
          })
        })
        .then(function(){
          document.getElementById("message").value = ""
        })
      }
    }>send</button>
  </section>}
}
class Messages extends Component{
  constructor(){
    super();
    this.state = { messages : [ ]}
  }
  componentDidMount(){
    setInterval(
    ()=>fetch('http://tnewport-mac.oxfordnanolabs.local:8000/messages', {mode: "cors"})
      .then(response => response.json())
        .then(newMessages => this.setState({messages : newMessages})),1000
)
  }
  render(){
    return <article>
<section>
    {this.state.messages.map(displayMessage)}
</section>
<MessageSender></MessageSender>
    </article>;
  }
}

export default () => {
    const element = <Messages></Messages>;
    ReactDOM.render(element, document.getElementById('app-root'));
}
