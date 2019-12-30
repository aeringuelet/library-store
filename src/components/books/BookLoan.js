import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import SubDetail from '../subscriptors/SubDetail';

class BookLoan extends Component {
    state = {  
        subCode: '',
        result: {},
        hasResults: false
    }

    render() {
        const { book } = this.props;

        if(!book) return <Spinner />;

        const { hasResults, result } = this.state;

        const getLoan = () => {
            const sub = this.state.result;
            const { firestore, history } = this.props;
            const book = { ...this.props.book };

            sub.loanDate = new Date().toLocaleDateString();
            book.lent.push(sub);

            firestore
                .update({
                    collection: 'books',
                    doc: book.id
                }, book)
                .then(response => {
                    history.push('/');
                })
        }

        let subDetail, btnGet = null;
        if(hasResults) {
            subDetail = <SubDetail 
                            data={result}
                        />;
            btnGet = <button 
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={getLoan}
                    >Get Loan</button>
        }

        const findSubByCode = e => {
            e.preventDefault();

            const { firestore } = this.props;
            const subscriptors = firestore.collection('subscriptors');
            const result = subscriptors.where("code", "==", this.state.subCode).get();

            result.then(response => {
                if(response.empty) {
                    this.setState({
                        hasResults: false,
                        result: {}
                    })
                } else { 
                    const data = response.docs[0];
                    this.setState({
                        hasResults: true,
                        result: data.data()
                    })
                }
            });
        }

        const handleChange = e => {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            })
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
                        {''} Getting a loan for: { book.title }
                    </h2>

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={findSubByCode}
                                className="mb-4"
                            >
                                <legend className="colo-primary text-center">
                                    Find subscriptor by code
                                </legend>

                                <div className="form-group">
                                    <input 
                                        type="text"
                                        name="subCode"
                                        className="form-control"
                                        onChange={handleChange}    
                                    />
                                </div>
                                <input type="submit" value="Find"className="btn btn-success btn-block" />
                            </form>

                            {subDetail}
                            {btnGet}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BookLoan.propTypes = {
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
)(BookLoan);