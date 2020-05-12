import React from 'react';

const Starred = ({ starred }) => (
    <div className="card card-body mt-3">
        <div className="row">
            <div className="col-md-6"><a href={starred.html_url} target="_black">{starred.name}</a></div>
        </div>
    </div>

)

export default Starred;