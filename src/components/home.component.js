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
          <h1 className="homepage-title">Welcome to Plant Paradise!</h1>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="homepage-p">This is our plant encyclopedia, a delightful and community-driven project where plant enthusiasts from around the world can share their knowledge and passion for flora!</p>
            <p className="homepage-p">Our platform functions like a Wikipedia for plants, where users have the power to add, edit, and expand the ever-growing collection of plant entries.</p>
            <p className="homepage-p">We believe that the collective wisdom of our plant-loving community is the key to building an extensive and reliable resource. Every contribution is valuable, and our team of dedicated moderators ensures the accuracy and quality of the information shared.</p>
          </div>
          <div className="col-md-6">
            <img
              src={require("../assets/homepage.jpg")}
              className="img-fluid homepage-image"
              alt="Plant Paradise"
              />
          </div>
        </div>
            <div className="row">
              <div className="col-md-12">
              <p className="homepage-p">So, whether you're a gardening aficionado, a botany enthusiast, or simply have a love for the green world around us, join us in this jolly adventure of exploring, documenting, and celebrating the wonders of plants. Together, we can create a comprehensive and joyful resource that inspires and educates plant lovers everywhere.</p>
              <p className="homepage-p">Happy browsing and happy gardening!</p>
              </div>
            </div>
            <div className="row">
            <Link to={"/items"} className="get-started">
              Get Started
            </Link>
            </div>
      </div>

    );
  }
}
