import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ChatWindow.scss';
import '../../assets/images/ChuHoen.jpg';
import Message from './Message';
import ChatInput from './ChatInput';

import {emitter} from '../../utils/emitter';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        
    }

    render() {
        const { selectedChat, messages, onSendMessage } = this.props;
        // return <div className="chat-window">Chọn một cuộc trò chuyện để bắt đầu</div>;
        if (!selectedChat) {
            // console.log("empty chat")
            return <div className="chat-window"><p className="select-to-chat">Chọn một cuộc trò chuyện để bắt đầu</p></div>;
        }

        return (
            <div className="chat-window">
                <div className="chat-window-header">
                    <h2>{selectedChat.name}</h2>
                    <p>
                        {selectedChat.type === "group"
                        ? `Thành viên: ${selectedChat.members.join(", ")}`
                        : "Chat 1:1"}
                    </p>
                </div>
                <div className="chat-window-messages">
                    {messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                <ChatInput onSendMessage={onSendMessage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
