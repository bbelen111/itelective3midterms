import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import FoodDetail from '../components/FoodDetail';
import { searchFoods } from '../api/edamam';

function FoodSearch() {
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    // Clear previous results if query is empty
    if (!query || query.trim().length === 0) {
      setResults([]);
      setSelectedFood(null);
      setError(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSelectedFood(null);

    try {
      const data = await searchFoods(query);
      setResults(data);
      
      if (data.length === 0) {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
  };

  const handleCloseDetail = () => {
    setSelectedFood(null);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">Packaged Food Finder</h1>
            <p className="lead text-muted">
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>⚠️ {error}</strong>
              {error.includes('Rate limit') && (
                <p className="mb-0 mt-2">
                  The API has rate limits. Please wait a moment and try again.
                </p>
              )}
              {error.includes('credentials') && (
                <p className="mb-0 mt-2">
                  Open Food Facts is free and doesn't require credentials. Please check your internet connection.
                </p>
              )}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Results and Details */}
          <div className="row g-4">
            {/* Results List */}
            <div className={selectedFood ? 'col-lg-6' : 'col-lg-12'}>
              {hasSearched && !isLoading && results.length === 0 && !error && (
                <div className="text-center py-5">
                  <h4 className="text-muted">no results found</h4>
                </div>
              )}
              
              {!hasSearched && !isLoading && (
                <div className="text-center py-5">
                  <h4 className="text-muted">search for a food</h4>
                </div>
              )}

              <ResultsList
                results={results}
                onSelectFood={handleSelectFood}
                isLoading={isLoading}
              />
            </div>

            {/* Food Detail */}
            {selectedFood && (
              <div className="col-lg-6">
                <FoodDetail food={selectedFood} onClose={handleCloseDetail} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodSearch;
