import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Chatting.scss';
// import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
// import {emitter} from '../../utils/emitter'
import {getChatList, getSelectChat} from "../../services/chatService";
import ChatList from '../../components/Chat/ChatList';
import ChatWindow from '../../components/Chat/ChatWindow';

class Chatting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            selectedChat: null,
            messages: [],
        };
    }

    async componentDidMount() {
        // Giả lập gọi API để lấy danh sách chat
        // axios.get("http://localhost:3000/chats").then((response) => {
        // this.setState({ chats: response.data });
        // });
        
        let response = await getChatList(); 
        // console.log("Response: ", response) 
        this.setState({
            chats: response
        })
    }

    selectChat = async (chat) => {
        // console.log("select chat ", chat.id);
        // this.setState({
        //     selectedChat: chat
        // })
        // Giả lập gọi API để lấy tin nhắn của chat được chọn
        let response = await getSelectChat(chat.id);
        console.log("Chat selected: ", chat)
        console.log("Chat response: ", response)
        console.log("chatMessages: ", response.chatMessages)
        this.setState({ 
            selectedChat: chat, 
            messages: response.chatMessages
        });
    }

    sendMessage = (message) => {
        console.log("send message");
        // const { selectedChat, messages } = this.state;
        // const newMessage = {
        //         id: messages.length + 1,
        //         sender: "Bạn",
        //         content: message,
        //         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        // };

        // Giả lập gửi tin nhắn
        // axios.post(`http://localhost:3000/messages/${selectedChat.id}`, newMessage).then(() => {
        //     this.setState({ messages: [...messages, newMessage] });
        // });
    };

    render() {
        // console.log('check render: ', this.state)
        // let arrUsers = this.state.arrUsers;
        return (
            <div className="chattingg-container">
                {/* <div className="title text-center">
                    Manage Users With Strike
                </div> */}
                <ChatList 
                    chats={this.state.chats} 
                    onSelectChat={this.selectChat} 
                />
                <ChatWindow
                    selectedChat={this.state.selectedChat}
                    messages={this.state.messages}
                    onSendMessage={this.sendMessage}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);
