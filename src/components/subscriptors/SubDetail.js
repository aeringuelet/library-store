import React from 'react';

const SubDetail = ({ data }) => {
    return (
        <div className="card my-3">
            <h4 className="card-header bg-primary text-white">
                Recipient Data
            </h4>

            <div className="card-body">
                <p className="font-weight-bold">Name: 
                    {''} <span className="font-weight-normal">{ data.name }</span>
                </p>

                <p className="font-weight-bold">Carrier: 
                    {''} <span className="font-weight-normal">{ data.carrier }</span>
                </p>
                
                <p className="font-weight-bold">Code: 
                    {''} <span className="font-weight-normal">{ data.code }</span>
                </p>
            </div>
        </div>
    );
}
 
export default SubDetail;