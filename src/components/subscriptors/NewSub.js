import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewSub extends Component {
    state = {
        name: '',
        carrier: '',
        code: ''
    }

    readData = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    addSub = e => {
        e.preventDefault();

        const newSub = {...this.state};
    
        const { firestore, history } = this.props;

        firestore
            .add({collection: 'subscriptors'}, newSub)
                .then(response => {
                    history.push('/subscriptors')
                })
                .catch(error => {

                });
    }

    render() { 
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/subscriptors' className='btn btn-secondary '>
                        <i className='fas fa-arrow-circle-left'></i>
                        {''} Back to list
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i>
                        {''} New Subscriptor
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">

                            <form
                                onSubmit={this.addSub}
                            >
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input 
                                        type="text"
                                        className='form-control'
                                        name='name'
                                        placeholder='Subscriptor name'
                                        required
                                        onChange={this.readData}
                                        value={this.state.name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carrier: </label>
                                    <input 
                                        type="text"
                                        className='form-control'
                                        name='carrier'
                                        placeholder='Carrier'
                                        required
                                        onChange={this.readData}
                                        value={this.state.carrier}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Code: </label>
                                    <input 
                                        type="text"
                                        className='form-control'
                                        name='code'
                                        placeholder='Code'
                                        required
                                        onChange={this.readData}
                                        value={this.state.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Add subscriptor"   
                                    className="btn btn-success" 
                                />
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

NewSub.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default firestoreConnect()( NewSub );