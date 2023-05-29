import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // Scroll to the top of the page
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="homepage">
        <div className="row">
          <div className="col-md-6">
            <div className="homepage-text-group">
            <h1 className="homepage-title">Welcome to Plant Paradise!</h1>
            <p className="homepage-p">Our platform functions like a Wikipedia for plants, where users have the power to add, edit, and expand the ever-growing collection of plant entries.</p>
            <p className="homepage-p">Our team of dedicated moderators ensures the accuracy and quality of the information shared.</p>
            <Link to={"/items"} className="get-started">
              Get Started
            </Link>
          </div>
          </div>
          <div className="col-md-6">
            <img
              src={require("../assets/homepage.jpg")}
              className="img-fluid homepage-image"
              alt="Plant Paradise"
              />
          </div>
        </div>
      </div>

    );
  }
}
