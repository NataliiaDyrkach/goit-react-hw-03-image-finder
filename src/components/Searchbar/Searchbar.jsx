import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from "react-icons/fa";
import css from '../styles.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query);

    if (query.trim() === '') {
      toast.error('Enter a search appellation!');
      return;
    }
    
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FaSearch size={20} />
          </button>

          <input
            className={css.SearchFormInput}
            onChange={this.handleChange}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
