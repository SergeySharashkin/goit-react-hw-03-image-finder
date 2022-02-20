import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";
import { Loader } from "../Loader/Loader";
import pictureAPI from "../../servises/api";
export default class ImageGallery extends Component {
  state = {
    imgList: null,
    error: null,
    status: "idle",
    activePicture: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { submitedValue, currentPage } = this.props;
    if (prevProps.submitedValue !== submitedValue) {
      this.setState({ status: "pending", imgList: null });
      pictureAPI
        .fetchPictures(currentPage, submitedValue)
        .then((imgList) => {
          this.setState({ imgList: imgList.hits, status: "resloved" });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  setActiveImg = (url) => {
    this.setState({ activePicture: url });
    this.props.updateURL(this.state.activePicture);
    // this.setState({ activePicture: "" });
  };
  render() {
    const { imgList, error, status } = this.state;

    if (status === "idle") {
      return <div></div>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <h1>{error.message}</h1>;
    }
    if (status === "resloved") {
      return (
        <ImageGalleryList>
          {imgList.map(({ webformatURL, largeImageURL, id }) => {
            return (
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                key={id}
                id={id}
                onClick={this.setActiveImg}
              />
            );
          })}
        </ImageGalleryList>
      );
    }
  }
}
