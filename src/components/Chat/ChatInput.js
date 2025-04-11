import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ChatInput.scss';

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleChangeInputMessage = (event) => {
        this.setState({ message: event.target.value });
    };

    handleSubmitMessage = (event) => {
        event.preventDefault();
        const { message } = this.state;
        const { onSendMessage } = this.props;

        if (message.trim()) {
            onSendMessage(message);
            this.setState({ message: "" });
        }
    };

    render() {
        const { message } = this.state;

        return (
            <form className="chat-input" onSubmit={(event) => this.handleSubmitMessage(event)}>
                <input
                type="text"
                placeholder="Aa"
                value={message}
                onChange={(event) => this.handleChangeInputMessage(event)}
                />
                <button type="submit">Gửi</button>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
