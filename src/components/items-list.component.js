import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Link, Navigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import AuthService from "../services/auth.service";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      currentUser : undefined,
      isModerator: false,
      isAdmin: false,
      redirect: null,

      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    window.scrollTo(0, 0); // Scroll to the top of the page
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
      this.retrieveItems();
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
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveItems() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    ItemDataService.getAll(params)
      .then((response) => {
        const { items, totalPages } = response.data;

        this.setState({
          items: items,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index,
    });
  }

  removeAllItems() {
    ItemDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
        currentIndex: -1,
      },
      () => {
        this.retrieveItems();
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
        this.retrieveItems();
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
      items,
      currentItem,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;


    return (
      <div className = "wrapper-for-everything">
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
                onClick={this.retrieveItems}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Plant List</h4>

          <div className="mt-3">
            {"Items per Page: "}
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
            {items &&
              items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    ((index === currentIndex || currentItem ? item.title === currentItem.title : false) ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  {item.title}
                </li>
              ))}
          </ul>
          
          {(isAdmin) && (
          <button
            className="m-3 btn btn-sm btn-danger delete-button"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
          )}
        </div>
        <div className="col-md-6 display-item">
          {currentItem ? (
            <div>
              <h4>Plant</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentItem.title}
              </div>
              <div>
                <label>
                  <strong>Biotope:</strong>
                </label>{" "}
                {currentItem.biotope.name}
              </div>
              <div>
                <label>
                  <strong>Family:</strong>
                </label>{" "}
                {currentItem.family.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentItem.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentItem.published ? "Verified" : "Pending"}
              </div>

              <Link
                to={"/items/" + currentItem.id}
                className="btn btn-md btn-primary edit-btn-list"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Don't be shy, <strong>select</strong> a plant!</p>
            </div>
          )}
        </div>
      </div>
      <div className="row col-md-12 add-new-item">
         <div className="col-md-4 add-new-item-child">
           <h4>Have a new plant to add?</h4>
           <Link to={"/add"} className="get-started">
             Add Plant
           </Link>
         </div>
         <div className="col-md-4 add-new-item-child">
           <h4>Need some info on biotopes?</h4>
           <Link to={"/biotopes"} className="get-started">
             See Biotopes
           </Link>
          </div>
         <div className="col-md-4 add-new-item-child">
           <h4>Check out the families?</h4>
           <Link to={"/families"} className="get-started">
             See Families
           </Link>
          </div>
       </div>
       
       
    </div>
    );
  }
}


