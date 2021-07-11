import React, { Component } from "react";
import RoomModal from "./components/RoomModal";
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewOccupied: false,
      modal: false,
      roomList: [],
      activeItem: {
        name: "",
        description: "",
        occupied: false,
      },
    };
  }

  componentDidMount(){
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/rooms/")
      .then((res) => this.setState({ roomList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/rooms/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/rooms/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
    .delete(`/api/rooms/${item.id}/`)
    .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { name: "", description: "", occupied: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayOccupied = (status) => {
    if (status) {
      return this.setState({ viewOccupied: true });
    }

    return this.setState({ viewOccupied: false });
  };

  renderTabList = () => {
    return (
      this.state.roomList.length > 0 ? 
      <div className="nav nav-tabs">
        <span
          className={this.state.viewOccupied ? "nav-link active" : "nav-link"}
          onClick={() => this.displayOccupied(true)}
        >
          Occupied
        </span>
        <span
          className={this.state.viewOccupied ? "nav-link" : "nav-link active"}
          onClick={() => this.displayOccupied(false)}
        >
          Not occupied
        </span>
      </div>
      : 
      <p>There are no rooms, add one</p>
    );
  };

  renderItems = () => {
    const { viewOccupied } = this.state;
    const newItems = this.state.roomList.filter(
      (item) => item.occupied == viewOccupied
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewOccupied ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Meeting Rooms</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add Room
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <RoomModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;