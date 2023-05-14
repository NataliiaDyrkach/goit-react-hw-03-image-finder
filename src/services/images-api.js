const URL = 'https://pixabay.com/api/';
const KEY = '34923417-02c79b4e71700a573ffcadca8';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}

export default fetchImages;