import { Component } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import Searchbar from "./components/SearchBar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
export default class App extends Component {
  state = {
    submitedValue: "",
    currentPage: 1,
    showModal: false,
    currentURL: null,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handelFormSubmit = (value) => {
    this.setState({ submitedValue: value });
  };
  handelNextPictures = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  hahandleActivePicture = (activeURL) => {
    this.setState({ currentURL: activeURL, showModal: true });
  };

  render() {
    const { submitedValue, currentPage, showModal, currentURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ImageGallery
          updateURL={this.hahandleActivePicture}
          submitedValue={submitedValue}
          currentPage={currentPage}
        />
        <Button clickHadler={this.handelNextPictures} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={currentURL} alt="nicePicture" width="300" />
          </Modal>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
