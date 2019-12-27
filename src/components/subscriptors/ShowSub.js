import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const ShowSub = ({ subscriptor }) => {
    if(!subscriptor) return <Spinner />

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to='/subscriptors' className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>
                    {''} Back to listing
                </Link>
            </div>

            <div className="col-md-6">
                <Link to={`/subscriptors/edit/${subscriptor.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i>
                    {''} Edit Sub
                </Link>
            </div>

            <hr className="mx-5 wd-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {subscriptor.name}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Carrier:
                    </span>
                    {''} {subscriptor.carrier}
                </p>

                <p>
                    <span className="font-weight-bold">
                        Code:
                    </span>
                    {''} {subscriptor.code}
                </p>

            </div>

        </div>
    );
}

ShowSub.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [{
        collection: 'subscriptors',
        storeAs: 'subscriptor',
        doc: props.match.params.id
    }]),
    connect(({ firestore: { ordered } }, props) => ({
        subscriptor: ordered.subscriptor && ordered.subscriptor[0]
    }))
)(ShowSub);