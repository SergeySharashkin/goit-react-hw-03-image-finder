import { Item, Image } from "./ImageGallery.styled";
export function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt={largeImageURL} />
    </Item>
  );
}
