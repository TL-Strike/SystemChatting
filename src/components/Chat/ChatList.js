import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ChatList.scss';
import '../../assets/images/ChuHoen.jpg'
// import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';

import {emitter} from '../../utils/emitter'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        
    }

    render() {
        // console.log('check render: ', this.state)
        // let arrUsers = this.state.arrUsers;
        const { chats, onSelectChat } = this.props;
        console.log("ChatList: ", chats)
        return (
            <div className="chat-list">
                <div className="chat-list-header">
                <h2>Đoạn chat</h2>
                <input type="text" placeholder="Tìm kiếm bạn bè" />
                </div>
                <div className="chat-list-items">
                {chats.map((chat) => (
                    <div
                    key={chat.id}
                    className="chat-item"
                    onClick={() => onSelectChat(chat)}
                    >
                    <div className="chat-item-avatar">
                        {/* <img src="https://via.placeholder.com/50" alt="avatar" /> */}
                        <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/489855871_1211978483801750_9094859343371389312_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFhdv0UrtvvvoQYAJNGGF8Y3unU_MUv_O7e6dT8xS_87sFc4GpQA4r1n_VsHscJN57MrGmXjPEaa9jkUNzWNhJr&_nc_ohc=02MhOEJMHCEQ7kNvwEAvGWF&_nc_oc=AdkBGoA9xPBBC464KMQgJUT_bU1ChKWhV2YUb0qBU59J5ptQ07hkp82rJWG1HV6QmvQ&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=DHK2H1UK6xqqJNlBliocSQ&oh=00_AfFzPMxPKCXUGqmzBb4goXiTvd6lcvzCAQSjGXkMuz786A&oe=67FF6671" alt="avatar" />
                    </div>
                    <div className="chat-item-info">
                        <h3>{chat.name}</h3>
                        <p>{chat.lastMessage}</p>
                        <span>{chat.time}</span>
                    </div>
                    </div>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
