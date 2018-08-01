import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendMessage} from './Chat';
import './styles.css'
import ChatHeader from './ChatHeader.js'

class ChatBot extends Component {

  state = {
    queryText: ""
  }

  handleChange = (event) => {
    const updatedText = event.target.value
    this.setState({queryText: updatedText})
  }

  handleSubmit = () => {
    if (this.state.queryText !== "") {
      this
        .props
        .sendMessage(this.state.queryText)
      this.setState({queryText: ""})
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    const {feed} = this.props;
    const serverFeed = feed.map((entry, index) => {
      switch (index) {
        case 0:
          return (null)
        default:
          switch (entry.sender) {
            case "server":
              return (
                <div className="server-response float-left" key={index}>
                  {entry.text}
                </div>
              );
            case "user":
              return (
                <div className="user-request float-right" key={index}>
                  {entry.text}
                </div>
              );
            default:
              return (null);
          }
      }
    })

    return (
      <div className="container-fluid pt-2">
        <div className="chat-container bg-white">
          <ChatHeader name="Katie"/>
          <div className="chat-result w-100 pt-4">
            {/* main content */}
            <table className="chat-table">
              <tbody>
                <tr>
                  <td id="result" className="">
                    <div>
                      {serverFeed}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="chat-input p-1">
            <div id="chatForm" className="h-100 w-100 d-flex justify-content-around">
              <input
                id="query"
                name="queryText"
                autoComplete="off"
                autoFocus="true"
                inputMode="text"
                className="h-100 w-75 p-2"
                type="text"
                value={this.state.queryText}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}/>
              <button className="start-chat-button" onClick={this.handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({feed: state});

export default connect(mapStateToProps, {sendMessage})(ChatBot);