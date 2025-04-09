import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import {emitter} from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
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

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    //Show or Hide
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'}) //fire event
                emitter.emit('EVENT_CLEAR_MODAL_DATA') //fire event
            }
            // console.log("response create user: ", response)
        } catch (e) {
            console.log(e)
        }
        
        // console.log('data from child ', data);
    }

    handleDeleteUser = async (user) => {
        // console.log('click delete: ', user)
        try {
            let response = await deleteUserService(user.id);
            if(response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = async (user) => {
        // console.log('check edit user: ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if(response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            }
            else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
        // console.log('click save user ', response)
    }

    render() {
        // console.log('check render: ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser} //isOpen is a prop
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && 
                    <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser} //isOpen is a prop
                    toggleFromParent={this.toggleUserEditModal}
                    currentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                />
                }
                <div className="title text-center">
                    Manage Users With Strike
                </div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3'
                    onClick={()=>this.handleAddNewUser()}
                    ><i className="fas fa-user-plus px-1"></i>Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
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
