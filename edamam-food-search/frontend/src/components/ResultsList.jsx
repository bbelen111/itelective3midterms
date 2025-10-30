import { useState } from 'react';

function ResultsList({ results, onSelectFood, isLoading }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleKeyDown = (e, food) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(food);
    }
  };

  const handleSelect = (food) => {
    setSelectedId(food.foodId);
    onSelectFood(food);
  };

  if (isLoading) {
    return (
      <div className="results-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card mb-3">
            <div className="card-body">
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
                <br />
                <span className="placeholder col-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="results-list">
      <h5 className="mb-3">Found {results.length} result{results.length !== 1 ? 's' : ''}</h5>
      <div className="list-group">
        {results.map((food) => (
          <button
            key={food.foodId}
            className={`list-group-item list-group-item-action ${
              selectedId === food.foodId ? 'active' : ''
            }`}
            onClick={() => handleSelect(food)}
            onKeyDown={(e) => handleKeyDown(e, food)}
            aria-label={`View details for ${food.label}`}
          >
            <div className="d-flex w-100 align-items-center">
              {food.image && (
                <img
                  src={food.image}
                  alt=""
                  className="rounded me-3"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  loading="lazy"
                />
              )}
              <div className="flex-grow-1">
                <h6 className="mb-1">{food.label}</h6>
                {food.brand && (
                  <small className={selectedId === food.foodId ? 'text-white-50' : 'text-muted'}>
                    Brand: {food.brand}
                  </small>
                )}
                {!food.brand && food.category && (
                  <small className={selectedId === food.foodId ? 'text-white-50' : 'text-muted'}>
                    {food.category}
                  </small>
                )}
                
                {/* Quick nutrient preview */}
                {food.nutrients && Object.keys(food.nutrients).length > 0 && (
                  <div className="mt-2">
                    <small className={selectedId === food.foodId ? 'text-white-50' : 'text-muted'}>
                      {food.nutrients.ENERC_KCAL && (
                        <span className="me-3">
                          ⚡ {Math.round(food.nutrients.ENERC_KCAL)} kcal
                        </span>
                      )}
                      {food.nutrients.PROCNT && (
                        <span className="me-3">
                          🥩 {Math.round(food.nutrients.PROCNT)}g protein
                        </span>
                      )}
                    </small>
                  </div>
                )}
              </div>
              <div className="ms-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
