import { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 400),
    [onSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.cancel(); // Cancel any pending debounced calls
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-white border-end-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="currentColor" 
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="form-control border-start-0 border-end-0"
          placeholder="Search for foods (e.g., apple, chicken breast, oats)..."
          value={query}
          onChange={handleInputChange}
          disabled={isLoading}
          aria-label="Search for foods"
          id="food-search-input"
        />
        {query && (
          <button
            type="button"
            className="btn btn-outline-secondary border-start-0"
            onClick={handleClear}
            disabled={isLoading}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      {isLoading && (
        <div className="text-center mt-3">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2 text-muted">Searching...</span>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
