import React, { Component } from "react";

import { Navigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.updateRolesUser = this.updateRolesUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      currentUser : undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,

      users: [],
      currentUserSelected: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 3,

      message: "",
      content: ""
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
      this.retrieveUsers();
      UserService.getAdminBoard().then(
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

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["username"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveUsers() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    UserService.getAllUsers(params)
      .then((response) => {
        const { users, totalPages } = response.data;

        this.setState({
          users: users,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUserSelected: null,
      currentIndex: -1,
    });
  }

  setActiveItem(user, index) {
    this.setState({
      currentUserSelected: user,
      currentIndex: index,
    });
  }

  
  updateRolesUser(roles) {
    // A function that will send a PUT request with the updated roles in the params
    UserService.updateRoles(this.state.currentUserSelected.username,roles)
      .then((response) => {
        console.log(response.data);
        const user = this.state.currentUserSelected
        user.roles = roles
        this.setState({
          message: response.data.message,
          currentUserSelected: user
        });
      }
      )
      .catch((e) => {
        console.log(e);
      }
      );
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveUsers();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveUsers();
      }
    );
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
      searchTitle,
      users,
      currentUserSelected,
      currentIndex,
      page,
      count,
      pageSize,
      content
    } = this.state;


    return (
      <div className = "wrapper-for-eveything">
        <div className="container col-md-12">
        <header className="jumbotron">
          <h3>Welcome Admin! Your job is to choose the moderators.</h3>
        </header>
      </div>
      <div className="list row">
        <div className="col-md-8 search-plants">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveUsers}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users</h4>

          <div className="mt-3">
            {"Users per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    ((index === currentIndex || currentUserSelected ? user.username === currentUserSelected.username : false) ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6 display-item">
          {currentUserSelected ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUserSelected.username}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUserSelected.email}
              </div>
              <div>
                <label>
                  <strong>Is a Moderator:</strong>
                </label>{" "}
                {currentUserSelected.roles.includes("moderator") ? "YES" : "NO"}
              </div>


              <div className = "publish-btn">
            {currentUserSelected.roles.includes("moderator") ? (
              <button
                className="btn btn-md btn-primary edit-btn-list"
                onClick={() => this.updateRolesUser(["user"])}
              >
                Remove Moderator Status
              </button>
            ) : (
              <button
                className="btn btn-md btn-primary edit-btn-list"
                onClick={() => this.updateRolesUser(["user", "moderator"])}
              >
                Add Moderator Status
              </button>
            )}
            </div>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Select a user.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }
}
