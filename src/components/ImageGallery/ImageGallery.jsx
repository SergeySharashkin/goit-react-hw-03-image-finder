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
    loading: false,
    // activePicture: null,
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { submitedValue } = this.props;
    const { currentPage } = this.state;
    const startPage = 1;
    if (prevProps.submitedValue !== submitedValue) {
      this.setState({
        // status: "pending",
        currentPage: 1,
        imgList: [],
      });
      pictureAPI
        .fetchPictures(startPage, submitedValue)
        .then((imgList) => {
          this.setState({
            imgList: imgList.hits,
            status: "resloved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(this.setState({ loading: false }));
    }
    if (prevState.currentPage !== currentPage && currentPage !== 1) {
      this.setState({ loading: true });

      pictureAPI
        .fetchPictures(currentPage, submitedValue)
        .then((imgList) => {
          this.setState({
            imgList: [...prevState.imgList, ...imgList.hits],
            status: "resloved",
          });
          return;
        })
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(this.setState({ loading: false }));
    }
  }
  handelNextPictures = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  setActiveImg = (url) => {
    // this.setState({ activePicture: url });
    this.props.updateURL(url);
  };
  render() {
    const { imgList, error, status, loading } = this.state;

    if (status === "idle") {
      return <div></div>;
    }
    // if (status === "pending") {
    //   return <Loader />;
    // }
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
          {loading && <Loader />}
          {imgList.length > 0 && (
            <Button clickHadler={this.handelNextPictures} />
          )}
        </div>
      );
    }
  }
}
