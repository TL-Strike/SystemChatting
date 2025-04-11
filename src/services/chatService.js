import axios from '../axios';

const getChatList = () => {
    //template string
    return axios.get("http://localhost:3001/chats")
}

const getSelectChat = (chatId) => {
    return axios.get(`http://localhost:3001/messages/${chatId}`)
}

export {getChatList, getSelectChat}