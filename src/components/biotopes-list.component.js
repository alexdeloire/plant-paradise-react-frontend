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
            description: "The forest biotope is a lush and vibrant ecosystem characterized by an abundance of trees, diverse plant life, and a rich array of wildlife. Forests are teeming with life and provide a multitude of essential ecological services. Trees dominate the landscape, forming a canopy that shades the forest floor and creates a unique microclimate. Underneath, a variety of plant species thrive, ranging from ferns, shrubs, and wildflowers to mosses and fungi. Forest plants have evolved strategies for competing for light, nutrients, and space, leading to complex and intricate ecosystems. These plants play a crucial role in oxygen production, carbon sequestration, soil stabilization, and providing habitats for countless animal species. Forests are not only a source of natural beauty but also offer valuable resources, such as timber, medicinal plants, and recreational spaces. They are vital for maintaining the health of our planet and are often referred to as the 'lungs of the Earth' due to their significant contribution to global oxygen levels."
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
