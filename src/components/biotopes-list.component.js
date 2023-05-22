import React, { Component } from "react";
import BiotopeDataService from "../services/biotope.service";
import { Link, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BiotopeList extends Component {
  constructor(props) {
    super(props);
    this.retrieveBiotopes = this.retrieveBiotopes.bind(this);
    this.saveBiotope = this.saveBiotope.bind(this);
    this.state = {
      currentUser : undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,

      biotopes: [],

      content: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
      this.retrieveBiotopes();
      UserService.getUserBoard().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
  
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
    else{
      this.setState({
        redirect: "/login"
      });
    }
  }

  retrieveBiotopes() {
    BiotopeDataService.getAll()
      .then(response => {
        this.setState({
          biotopes: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

    saveBiotope() {
        var data = {
            name: "Forest",
            description: "biotope"
        };

        BiotopeDataService.create(data)
            .then(response => {
                this.setState(prevState => ({
                    biotopes: [...prevState.biotopes, response.data]
                  }));
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


  render() {
    if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
      }
  
      const {
        currentUser,
        isModerator,
        isAdmin,
        redirect,
        biotopes,
        content
      } = this.state;


    return (
    <div className="container family-biotope-pad">
      <div className="row">
          <div className="col-md-12">
            <h4>Biotopes List</h4>

            {biotopes.map((biotope) => (
              <div className="card mb-3" key={biotope._id}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={require(`../assets/${biotope.name}.jpg`)}
                      className="card-img"
                      alt={biotope.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{biotope.name}</h5>
                      <p className="card-text">{biotope.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add Biotope Button 
      A quick button that lets me add a new biotope to the database
        <div className="row">
        <div className="col-md-12">
             <button
               type="submit"
               className="btn btn-primary"
               onClick={this.saveBiotope}
             >
               Add Biotope
             </button>
           </div>
         </div>
         */}
      </div>
    );
  }
}
