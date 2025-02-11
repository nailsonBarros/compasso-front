import React from 'react';

const Repo = ({ repo }) => (
    <div className="card card-body mt-3">
        <div className="row">
            <div className="col-md-6"><a href={repo.html_url} target="_black">{repo.name}</a></div>
            <div className="col-md-6">
                <span className="badge badge-primary">Starts: {repo.stargazers_count}</span>
                <span className="badge badge-secondary">Watch: {repo.watchers_count}</span>
                <span className="badge badge-success">Forks: {repo.forks_count}</span>
            </div>
        </div>
    </div>

)

export default Repo;