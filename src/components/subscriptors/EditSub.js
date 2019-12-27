import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditSub extends Component {

    nameRef = React.createRef();
    carrierRef = React.createRef();
    codeRef = React.createRef();

    editSub = e => {
        e.preventDefault();

        const editedSub = {
            name: this.nameRef.current.value,
            carrier: this.carrierRef.current.value,
            code: this.codeRef.current.value
        }

        const { subscriptor, firestore, history } = this.props;

        firestore.update({
            collection: 'subscriptors',
            doc: subscriptor.id
        }, editedSub)
            .then(history.push('/subscriptors'))
    }

    render() { 
        const { subscriptor } = this.props;

        if(!subscriptor) return <Spinner />;

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
                        <i className="fas fa-user"></i>
                        {''} Edit Subscriptor
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">

                            <form
                                onSubmit={this.editSub}
                            >
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input 
                                        type="text"
                                        className='form-control'
                                        name='name'
                                        placeholder='Subscriptor name'
                                        required
                                        defaultValue={subscriptor.name}
                                        ref={this.nameRef}
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
                                        ref={this.carrierRef}
                                        defaultValue={subscriptor.carrier}
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
                                        ref={this.codeRef}
                                        defaultValue={subscriptor.code}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Save"   
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
 
EditSub.propTypes = {
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
)(EditSub);