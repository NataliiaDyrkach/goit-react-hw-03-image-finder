import PropTypes from 'prop-types';
import css from '../styles.module.css';

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
