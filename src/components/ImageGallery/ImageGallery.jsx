import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import pictureAPI from "../../servises/api";
export default class ImageGallery extends Component {
  state = {
    imgList: [],
    error: null,
    status: "idle",
    activePicture: null,
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { submitedValue } = this.props;
    const { currentPage } = this.state;
    if (prevProps.submitedValue !== submitedValue) {
      this.setState({ status: "pending", currentPage: 1 });
      pictureAPI
        .fetchPictures(currentPage, submitedValue)
        .then((imgList) => {
          this.setState({
            imgList: [...imgList.hits],
            status: "resloved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
    if (prevState.currentPage !== currentPage) {
      this.setState({ status: "pending" });
      pictureAPI
        .fetchPictures(currentPage, submitedValue)
        .then((imgList) => {
          this.setState({
            imgList: [...prevState.imgList, ...imgList.hits],
            status: "resloved",
          });
          return;
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }
  handelNextPictures = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
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
        <div>
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
          {imgList.length > 0 && (
            <Button clickHadler={this.handelNextPictures} />
          )}
        </div>
      );
    }
  }
}
