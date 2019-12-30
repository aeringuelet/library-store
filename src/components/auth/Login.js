import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Login extends Component {
    state = {
        email: '',
        pass: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = e => {
        e.preventDefault();

        const { firebase, history } = this.props;
        const { email, pass } = this.state;

        firebase
            .login({
                email,
                password: pass
            })
            .then(response => {
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() { 
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">

                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i>
                                {''} Login
                            </h2>

                            <form
                                onSubmit={this.login}
                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control"
                                        required
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password:</label>
                                    <input 
                                        type="password" 
                                        name="pass" 
                                        className="form-control"
                                        required
                                        value={this.state.pass}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    value="LogIn"
                                    className="btn btn-success btn-block"
                                />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}
 
export default firebaseConnect()(Login);