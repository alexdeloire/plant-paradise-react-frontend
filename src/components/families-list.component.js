import React, { Component } from "react";
import FamilyDataService from "../services/family.service";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class FamilyList extends Component {
  constructor(props) {
    super(props);
    this.retrieveFamilies = this.retrieveFamilies.bind(this);
    this.saveFamily = this.saveFamily.bind(this);
    this.state = {
      currentUser: undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,
      families: [],
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
      this.retrieveFamilies();
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
    } else {
      this.setState({
        redirect: "/login"
      });
    }
  }

  retrieveFamilies() {
    FamilyDataService.getAll()
      .then(response => {
        this.setState({
          families: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveFamily() {
    var data = {
      name: "Flowers and No Fruit",
      description: "Plants that have flowers but no fruit belong to a group known as angiosperms or flowering plants. These plants are characterized by their ability to produce beautiful and diverse flowers, which serve as the reproductive structures. Unlike gymnosperms, angiosperms have enclosed seeds within protective structures called ovaries, which develop into fruits after successful pollination and fertilization. However, there are certain instances where angiosperms produce flowers that do not develop into fruits. This can occur due to factors such as incomplete pollination, lack of fertilization, or intentional cultivation practices. Examples of angiosperms that exhibit this characteristic include many ornamental flowers grown for their aesthetic appeal, such as roses, tulips, lilies, and orchids. While these plants may not bear fruits, their flowers still captivate us with their vibrant colors, intricate structures, and enticing fragrances. The presence of flowers in these plants attracts pollinators and plays a crucial role in the reproduction and survival of angiosperms."
    };

    FamilyDataService.create(data)
      .then(response => {
        this.setState(prevState => ({
          families: [...prevState.families, response.data]
        }));
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const {
      currentUser,
      isModerator,
      isAdmin,
      redirect,
      families,
      content
    } = this.state;

    return (
      <div className="container family-biotope-pad">
        <div className="row">
          <div className="col-md-12">
            <h4>Families List</h4>

              {families.map((family) => (
                <div className="card mb-3" key={family._id}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4">
                      <img
                        src={require(`../assets/${family.name}.jpg`)}
                        className="card-img"
                        alt={family.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{family.name}</h5>
                        <p className="card-text">{family.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Add Family Button 
        <div className="row">
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.saveFamily}
            >
              Add Family
            </button>
          </div>
        </div>
      */}
      </div>
    );
  }
}
