import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from '../styles.module.css';

function ImageGallery({images, openModal}) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, description, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
