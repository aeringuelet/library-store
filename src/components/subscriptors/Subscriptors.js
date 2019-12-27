import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Subscriptors = ({ subscriptors, firestore, history }) => {

    if(!subscriptors) return <Spinner />;

    const deleteSub = id => {
        firestore.delete({
            collection: 'subscriptors',
            doc: id
        })
        .then(response => {
            history.push('/subscriptors')
        })
        .catch(error => {

        });
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link 
                    to={'/subscriptors/new'}
                    className='btn btn-primary'
                >
                    <i className="fas fa-plus"></i>
                    {''} New Subscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i>
                    Subscriptors
                </h2>
            </div>

            <table className="table table-stripped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Name</th>
                        <th>Carrier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptors.map(sub => (
                        <tr key={sub.id}>
                            <td>
                                {sub.name}
                            </td>
                            <td>
                                {sub.carrier}
                            </td>
                            <td>
                                <Link 
                                    to={`subscriptors/show/${sub.id}`}
                                    className='btn btn-success btn-block'
                                >
                                    <i className="fas fa-angle-double-right"></i>
                                    {''} Show
                                </Link>
                                
                                <button
                                    type='button' 
                                    className="btn btn-danger btn-block"
                                    onClick={() => deleteSub(sub.id)}
                                >
                                    <i className='fas fa-tracsh-alt'></i>
                                    {''} Delete
                                </button>

                                <Link 
                                    to={`subscriptors/edit/${sub.id}`}
                                    className='btn btn-block'
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Subscriptors.propTypes = {
    firestore: PropTypes.object.isRequired,
    subscriptors: PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection: 'subscriptors' }]),
    connect((state, props) => ({
        subscriptors: state.firestore.ordered.subscriptors
    }))
)(Subscriptors);