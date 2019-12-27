import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


class ShowBook extends Component {
    state = {

    }

    render() { 
        const { book } = this.props;

        if(!book) return <Spinner />;

        let btnLoan;

        if(book.amount - book.lent.length > 0) {
            btnLoan = <Link to={`/books/loan/${book.id}`}
                            className='btn btn-success my-3'
                        >
                            Ask for a loan
                        </Link>
        } else {
            btnLoan = null;
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        {''} Back to listing
                    </Link>
                </div>

                <div className="col-md-6 mb-4">
                    <Link to={`/books/edit/${book.id}`} className="btn btn-secondary float-right">
                        <i className="fas fa-pencil-alt"></i>
                        {''} Edit book
                    </Link>
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                    <h2 className="mb-4">
                        {book.title}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span>
                            {''} {book.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Amount:
                        </span>
                            {''} {book.amount}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Available:
                        </span>
                            {''} {book.amount - book.lent.length}
                    </p>

                    {btnLoan}

                </div>
            </div>
        );
    }
}
 

ShowBook.propTypes = {
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
)(ShowBook);