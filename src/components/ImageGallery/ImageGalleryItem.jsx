import { Item, Image } from "./ImageGallery.styled";
export function ImageGalleryItem({ webformatURL, largeImageURL }) {
  return (
    <Item>
      <Image src={webformatURL} alt={largeImageURL} />
    </Item>
  );
}
