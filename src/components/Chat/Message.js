import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Message.scss';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { message } = this.props;
        const isMe = message.sender === "Bạn";

        return (
            <div className={`message ${isMe ? "message-me" : "message-other"}`}>
                <div className="message-content">
                <p>{message.content}</p>
                <span>{message.time}</span>
                </div>
            </div>
            );
        }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
