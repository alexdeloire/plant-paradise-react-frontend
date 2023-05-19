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
          <h1>Welcome to Plant Paradise!</h1>
          <p>Looking for a new hobby? In dire need of some gardening information? </p>
          <p>Plant Paradise is the right place for you! Explore the world of plants. What are you waiting for?</p>
        <Link to={"/items"} className="get-started">
            Get Started
          </Link>
      </div>
    );
  }
}
