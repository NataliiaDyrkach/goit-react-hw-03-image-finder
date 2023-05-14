import PropTypes from 'prop-types';
import css from '../styles.module.css';

function Button({ onNextFetch }) {
  return (
    <button className={css.Button} type="button" onClick={onNextFetch}>
      Load more 
    </button>
  );
}

Button.propTypes = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;