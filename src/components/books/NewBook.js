import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewBook extends Component {
    state = {
        title: '',
        ISBN: '',
        amount: '',
        lent: []
    }

    render() { 
        const handleInputChange = e => {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            })
        }

        const handleSubmit = e => {
            e.preventDefault();


            const newBook = {...this.state};

            const { firestore, history } = this.props;

            firestore.add({ collection: 'books' }, newBook)
                .then(history.push('/'));
        }

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/' className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        {''} Back to listing
                    </Link>
                </div>

                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>
                        New book
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form>
                                <div className="form-group">
                                    <label>
                                        Title
                                    </label>
                                    <input 
                                        type="text" 
                                        className='form-control'
                                        name='title'
                                        required   
                                        placeholder='Book title'
                                        value={this.state.title}
                                        onChange={handleInputChange}    
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        ISBN
                                    </label>
                                    <input 
                                        type="text" 
                                        className='form-control'
                                        name='ISBN'
                                        required   
                                        placeholder='ISBN'
                                        value={this.state.ISBN}
                                        onChange={handleInputChange}    
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        Amount of books
                                    </label>
                                    <input 
                                        type="number" 
                                        min='0'
                                        className='form-control'
                                        name='amount'
                                        required   
                                        placeholder='Amount of books'
                                        value={this.state.amount}
                                        onChange={handleInputChange}    
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    onClick={handleSubmit} 
                                    value='Add book' 
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

NewBook.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default firestoreConnect()(NewBook);