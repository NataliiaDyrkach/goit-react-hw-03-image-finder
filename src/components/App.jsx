import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../services/images-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';


class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    imagesOnPage: 0,
    totalImages: 0,
    currentImageUrl: null,
    currentImageDescription: null,     
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = event => {
    const currentImageUrl = event.target.dataset.large;
    const currentImageDescription = event.target.alt;
    // console.log(currentImageUrl);
    // console.log(currentImageDescription);

    if (event.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {

    const { images, isLoading, imagesOnPage, totalImages, showModal,currentImageUrl, currentImageDescription} = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {isLoading && <Loader />}

        {imagesOnPage >= 12 &&
          imagesOnPage < totalImages && (
            <Button onNextFetch={this.onNextFetch} />
          )}
        
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
