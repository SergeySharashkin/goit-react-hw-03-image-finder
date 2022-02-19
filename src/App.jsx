import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Searchbar from "./components/SearchBar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
export default class App extends Component {
  state = {
    submitedValue: "",
    // photo: null,
    // loading: false,
  };
  handelFormSubmit = (value) => {
    this.setState({ submitedValue: value });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handelFormSubmit} />
        {/* {this.state.photo && <div>bbbb</div>}
        {this.state.loading && <div>loading...</div>} */}
        <ToastContainer autoClose={2000} />
        <ImageGallery submitedValue={this.state.submitedValue} />
      </div>
    );
  }
}
