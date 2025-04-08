import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
            // , () => {
            //     console.log('check state user: ', this.state.arrUsers);
            // }) //callback: khi this.state() chay xong thì sẽ chạy vào callback (arrow function)
            // console.log('check state user 1: ', this.state.arrUsers);
        }
        
        // console.log('Get user from NodeJs: ', response);
    }


    render() {
        console.log('check render: ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">
                    Manage Users With Strike
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    console.log("Check Map: ", item, index)
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
