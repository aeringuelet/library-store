import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Books = ({ books, firestore, history }) => {
    if(!books) return <Spinner />;

    const deleteBook = id => {
        firestore.delete({
            collection: 'books',
            doc: id
        })
        .then(response => {
            history.push('/')
        })
        .catch(error => {

        });
    }

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link to='/books/new' className="btn btn-success">
                    <i className="fas fa-plus"></i>
                    {''} New Book
                </Link>
            </div>

            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i>
                    {''} Books
                </h2>
            </div>

            <table className="table table-stripped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Amount</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>
                                {book.title}
                            </td>
                            <td>
                                {book.ISBN}
                            </td>
                            <td>
                                {book.amount}
                            </td>
                            <td>
                                {book.amount - book.lent.length}
                            </td>
                            <td>
                                <Link to={`/books/show/${book.id}`} className='btn btn-success btn-block'>
                                    <i className="fas fa-angle-double-right"></i>
                                    {''} Show Details
                                </Link>
                                <button 
                                    type='button' 
                                    className='btn btn-danger btn-block'
                                    onClick={() => deleteBook(book.id)}    
                                >
                                    <i className="fas fa-trash-alt"></i>
                                    {''} Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
 
Books.propTypes = {
    firestore: PropTypes.object.isRequired,
    books: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'books' }]),
    connect((state, props) => ({
        books: state.firestore.ordered.books
    }))
)(Books);