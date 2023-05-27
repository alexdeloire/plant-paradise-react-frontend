import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import ItemDataService from "../services/item.service";
import { withRouter } from '../common/with-router';
import AuthService from "../services/auth.service";
import BiotopeService from "../services/biotope.service";
import FamilyService from "../services/family.service";

class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.adjustTextareaHeight = this.adjustTextareaHeight.bind(this);
    this.getBiotope = this.getBiotope.bind(this);
    this.getFamily = this.getFamily.bind(this);

    this.state = {
      currentUser: undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,

      currentItem: {
        id: null,
        title: "",
        description: "",
        published: false,
        biotope: null,
        family: null
      },
      biotopes: [],
      families: [],
      message: ""
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
      this.getItem(this.props.router.params.id);
      this.getBiotope();
      this.getFamily();
    } else {
      this.setState({
        redirect: "/login"
      });
    }
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        title: title
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        description: description
      }
    }), this.adjustTextareaHeight);
  }

  adjustTextareaHeight() {
    const textarea = document.getElementById("description");
    textarea.style.height = "auto"; // Reset the height to recalculate it
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to fit the content
  }

  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data
        }, () =>{
        this.setSelectedValue("biotope", this.state.currentItem.biotope);
        this.setSelectedValue("family", this.state.currentItem.family);
        this.adjustTextareaHeight();
        console.log(response.data);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getBiotope() {
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

  getFamily() {
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

  setSelectedValue(selectId, value) {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
      selectElement.value = value;
    }
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentItem.id,
      title: this.state.currentItem.title,
      description: this.state.currentItem.description,
      published: status
    };

    ItemDataService.update(this.state.currentItem.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            published: status
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateItem() {
    var data = {
      id: this.state.currentItem.id,
      title: this.state.currentItem.title,
      description: this.state.currentItem.description,
      published: false,
      biotope: this.state.currentItem.biotope,
      family: this.state.currentItem.family
    };

    ItemDataService.update(this.state.currentItem.id, data)
      .then(response => {
        console.log(response.data);
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            published: false
          },
          message: "The item was updated successfully! A moderator will review it to verify it."
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteItem() {
    ItemDataService.delete(this.state.currentItem.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/items');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentItem, isAdmin, isModerator } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="edit-form">
            <h4>Plant</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentItem.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="biotope">Biotope</label>
                <select
                  className="form-control"
                  id="biotope"
                  value={currentItem.biotope}
                  onChange={(e) => this.setState(prevState => ({
                    currentItem: {
                      ...prevState.currentItem,
                      biotope: e.target.value
                    }
                  }))}
                >
                  <option value="">Select a biotope</option>
                  {this.state.biotopes.map((biotope) => (
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
                  value={currentItem.family}
                  onChange={(e) => this.setState(prevState => ({
                    currentItem: {
                      ...prevState.currentItem,
                      family: e.target.value
                    }
                  }))}
                >
                  <option value="">Select a family</option>
                  {this.state.families.map((family) => (
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
                  value={currentItem.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentItem.published ? "Verified" : "Pending"}
              </div>
            </form>

            {isModerator || isAdmin ? (
              <div className="publish-btn">
                {currentItem.published ? (
                  <button
                    className="btn btn-primary mr-2 mb-2 unverify-button"
                    onClick={() => this.updatePublished(false)}
                  >
                    UnVerify
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mr-2 mb-2 verify-button"
                    onClick={() => this.updatePublished(true)}
                  >
                    Verify
                  </button>
                )}
                <button
                  className="btn btn-danger mr-2 mb-2 delete-button"
                  onClick={this.deleteItem}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <button
              type="submit"
              className="btn btn-success mr-2 mb-2 add-button"
              onClick={this.updateItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a plant</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Item);
