import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";

export default class ImageGallery extends Component {
  state = {
    imgList: null,
  };
  //   state = { submitedValue: this.props.submitedValue };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submitedValue !== this.props.submitedValue) {
      console.log("prevProps.submitedValue", prevProps.submitedValue);
      console.log("this.submitedValue", this.props.submitedValue);

      const MY_KEY = "24256402-655c9b75f9739418750c25629";
      const currentPage = 1;

      //   this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.submitedValue}&page=${currentPage}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((imgList) => {
          this.setState({ imgList: imgList.hits });
          console.log(this.state.imgList);
        })
        .finally(() => {
          //   this.setState({ loading: false });
        });
    }
  }
  render() {
    return (
      <ImageGalleryList>
        {this.state.imgList &&
          this.state.imgList.map((img) => {
            return (
              <ImageGalleryItem
                webformatURL={img.webformatURL}
                largeImageURL={img.largeImageURL}
                key={img.id}
              />
            );
          })}
      </ImageGalleryList>
    );
  }
}
