import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Profile from './Profile';
import Repo from './Repo';
import Starred from './Starred';


class App extends Component {  
  constructor(){
    super();    
    this.state = {
      github:{
        url: "https://api.github.com/users",
        client_id: "4518dcf872d204994236",
        client_secret: "b365d0dac43dab183fd2f1d3ab88446c8ac01c54",
        count: 7,
        sort: "created: asc",
        flag: ""
      },
      user: [],
      repos: [],
      starreds: []
    };
  }

  getUser = e => {    
    const { user } = this.state;

    this.state.github.flag = "getuser";

    const {url, client_id, client_secret, count,sort} = this.state.github;
      axios
        .get(
          `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        )
        .then(({ data }) => this.setState({ user: data }));

    
    axios
      .get(
        `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ repos: data }));    

  };

  getStarred = e => {    
    const { user } = this.state;

    this.state.github.flag = "getstarred";

    const {url, client_id, client_secret, count,sort} = this.state.github;
      axios
        .get(
          `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        )
        .then(({ data }) => this.setState({ user: data }));

    
    axios
      .get(
        `${url}/${user}/starred?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ starreds: data }));    

  };

  renderProfileRepos = () => {
    const { user, repos } = this.state;
    
    return (
      <div className="row">  
        <div className="col-md-4">
          <Profile user={user} />
        </div>
        <div className="col-md-8">
          {repos.map(repo => <Repo key={repo.name} repo = {repo} />)}
        </div>
      </div>
    )

  }

  renderProfileStarred = () => {
    const { user, starreds } = this.state;
      
    return (
      <div className="row">  
        <div className="col-md-4">
          <Profile user={user} />
        </div>
        <div className="col-md-8">
          {starreds.map(starred => <Starred key={starred.name} starred = {starred} />)}
        </div>
      </div>
    )

  }

  render(){
    const { user, repos, starreds } = this.state;
    
    return (
      <div className="App">
          <Navbar />

          <div className="container">
            <div className="card card-body">
              <h1>Pesquisar Usuários do GitHub</h1>
              <p className="lead">Digite um nome para encontrar usuários e repositórios</p>
              <input id="search" onChange={(e) => this.setState({user: e.target.value})} type="text" className="form-control" required />
              
              <div className="row">
                <div className="card-body">
                  <button onClick={this.getUser} className="btn btn-primary btn-block">Pesquisar Repositório</button>
                </div>
                <div className="card-body">
                  <button onClick={this.getStarred} className="btn btn-secondary btn-block">Pesquisar Favoritos</button>
                </div>
              </div>
            </div>

            {this.state.github.flag === "getuser" ? this.renderProfileRepos() : null}
            {this.state.github.flag === "getstarred" ? this.renderProfileStarred() : null}

          </div>
      </div>
    );
  }
}

export default App;
