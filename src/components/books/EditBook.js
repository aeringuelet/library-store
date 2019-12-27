import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditBook extends Component {
    
    titleRef = React.createRef();
    isbnRef = React.createRef();
    amountRef = React.createRef();

    render() { 
        const { book, firestore, history } = this.props;

        if(!book) return <Spinner />;

        const editBook = e => {
            e.preventDefault();

            const editedBook = {
                title: this.titleRef.current.value,
                ISBN: this.isbnRef.current.value,
                amount: this.amountRef.current.value
            }

            firestore.update({ collection: 'books', doc: book.id }, editedBook)
                .then(history.push('/'));
        }

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/' className='btn btn-secondary '>
                        <i className='fas fa-arrow-circle-left'></i>
                        {''} Back to list
                    </Link>
                </div>

                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>
                        {''} Edit Book
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">

                            <form
                                onSubmit={this.editBook}
                            >
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
                                        defaultValue={book.title}
                                        ref={this.titleRef}
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
                                        defaultValue={book.ISBN}
                                        ref={this.isbnRef}    
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
                                        defaultValue={book.amount}
                                        ref={this.amountRef}    
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    onClick={editBook} 
                                    value='Save' 
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

EditBook.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [{
        collection: 'books',
        storeAs: 'book',
        doc: props.match.params.id
    }]),
    connect(({ firestore: { ordered } }, props) => ({
        book: ordered.book && ordered.book[0]
    }))
)(EditBook);