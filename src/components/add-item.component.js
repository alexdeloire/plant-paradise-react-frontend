import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BiotopeService from "../services/biotope.service";
import FamilyService from "../services/family.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBiotope = this.onChangeBiotope.bind(this);
    this.onChangeFamily = this.onChangeFamily.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);
    this.adjustTextareaHeight = this.adjustTextareaHeight.bind(this);
    this.getBiotopes = this.getBiotopes.bind(this);
    this.getFamilies = this.getFamilies.bind(this);

    this.state = {
      currentUser: undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,

      biotopes: [],
      selectedBiotope: null,
      families: [],
      selectedFamily: null,

      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // Scroll to the top of the page
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN")
      });
      this.getBiotopes();
      this.getFamilies();
    } else {
      this.setState({
        redirect: "/login"
      });
    }
  }

  getBiotopes() {
    BiotopeService.getAll()
      .then(response => {
        this.setState({
          biotopes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFamilies() {
    FamilyService.getAll()
      .then(response => {
        this.setState({
          families: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    }, this.adjustTextareaHeight);
  }

  adjustTextareaHeight() {
    const textarea = document.getElementById("description");
    textarea.style.height = "auto"; // Reset the height to recalculate it
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to fit the content
  }

  onChangeBiotope(e) {
    const biotope = e.target.value;
    this.setState({
      selectedBiotope: biotope
    });
  }

  onChangeFamily(e) {
    const family = e.target.value;
    this.setState({
      selectedFamily: family
    });
  }

  saveItem() {
    const { title, description, selectedBiotope, selectedFamily } = this.state;

    var data = {
      title,
      description,
      biotope: selectedBiotope,
      family: selectedFamily
    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          selectedBiotope: response.data.biotope,
          selectedFamily: response.data.family,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      title: "",
      description: "",
      selectedBiotope: null,
      selectedFamily: null,
      published: false,
      submitted: false
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { submitted, title, description, biotopes, families } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4 className="submit-success-text">You submitted successfully!</h4>
            <div className="submit-success-button">
            <button className="btn btn-success add-button" onClick={this.newItem}>
              Add another plant
            </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="biotope">Biotope</label>
              <select
                className="form-control"
                id="biotope"
                required
                onChange={this.onChangeBiotope}
                value={this.state.selectedBiotope}
              >
                <option value="">-- Select Biotope --</option>
                {biotopes.map(biotope => (
                  <option key={biotope._id} value={biotope._id}>
                    {biotope.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="family">Family</label>
              <select
                className="form-control"
                id="family"
                required
                onChange={this.onChangeFamily}
                value={this.state.selectedFamily}
              >
                <option value="">-- Select Family --</option>
                {families.map(family => (
                  <option key={family._id} value={family._id}>
                    {family.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control auto-resize-textarea"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveItem} className="btn btn-success add-button">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
