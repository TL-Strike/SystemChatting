import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { use } from 'react';
import {handleLoginApi, createNewUserService} from '../../services/userService';
import ModalCreateNewAccount from '../System/ModalCreateNewAccount';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isOpenModalCreateNewUser: false,
        }
    }

    handleOnChangeUsername = (event) => {
        // setState để cập nhật giá trị của input (thay đổi state)
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value); // Lấy giá trị của input
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        // alert('Login clicked!'); //hiển thị thông báo khi click vào nút login
        // console.log('username: ' + this.state.username, 'password: ' + this.state.password)
        // console.log('all state: ', this.state) //hiển thị tất cả state trong console
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            // console.log("hoidanit: ", data)
            if(data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login Succeed')
            }
        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('hoidanit: ', error.response)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword //toggle password visibility
        })
    }

    //Show or Hide
    toggleCreateNewAccount = () => {
        this.setState({
            isOpenModalCreateNewUser: !this.state.isOpenModalCreateNewUser,
        })
    }

    handleCreateNewAccount = () => {
        this.setState({
            isOpenModalCreateNewUser: true
        })
    }

    createNewAccount = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                this.setState({
                    isOpenModalCreateNewUser: false
                })
            }
            // console.log("response create user: ", response)
        } catch (e) {
            console.log(e)
        }
        
        // console.log('data from child ', data);
    }


    render() {
        //Code JSX
        
        return (
            <div className="login-background">
                <ModalCreateNewAccount
                    isOpen={this.state.isOpenModalCreateNewUser}
                    toggleFromParent={this.toggleCreateNewAccount}
                    createNewAccount={this.createNewAccount}
                />
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">LOGIN</div>
                        <div className="col-12 form-group login-input">
                            <label>Username: </label>
                            <input type="text" className="form-control" placeholder="Enter your username" 
                            value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}/>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control" placeholder="Enter your password"
                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)}/>
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>

                        </div>
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12">
                            <button className='btn-create-new-account' onClick={() => {this.handleCreateNewAccount()}}>Create New Account</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
