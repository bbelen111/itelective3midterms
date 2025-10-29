import { useState, useEffect } from 'react';
import { getFoodNutrients } from '../api/edamam';

function FoodDetail({ food, onClose }) {
  const [nutrients, setNutrients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const loadNutrients = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const measureToUse = selectedMeasure || (food.measures && food.measures[0]);
      const data = await getFoodNutrients(food.foodId, food.label, measureToUse, quantity);
      setNutrients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (food) {
      loadNutrients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food, selectedMeasure, quantity]);

  const handleMeasureChange = (e) => {
    const measure = food.measures.find(m => m.uri === e.target.value);
    setSelectedMeasure(measure);
  };

  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0 && value <= 100) {
      setQuantity(value);
    }
  };

  if (!food) return null;

  return (
    <div className="food-detail">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{food.label}</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="card-body">
          {food.brand && (
            <p className="text-muted mb-3">
              <strong>Brand:</strong> {food.brand}
            </p>
          )}

          {/* Serving size controls */}
          {food.measures && food.measures.length > 0 && (
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="quantity-input" className="form-label">
                  Quantity
                </label>
                <input
                  id="quantity-input"
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="0.1"
                  max="100"
                  step="0.1"
                  disabled={isLoading}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="measure-select" className="form-label">
                  Measure
                </label>
                <select
                  id="measure-select"
                  className="form-select"
                  value={selectedMeasure?.uri || food.measures[0]?.uri}
                  onChange={handleMeasureChange}
                  disabled={isLoading}
                >
                  {food.measures.map((measure) => (
                    <option key={measure.uri} value={measure.uri}>
                      {measure.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading nutrients...</span>
              </div>
              <p className="text-muted mt-2">Loading nutrient information...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!isLoading && !error && nutrients && (
            <div>
              <h6 className="mb-3">Nutrition Facts</h6>
              
              {nutrients.weight > 0 && (
                <p className="text-muted mb-3">
                  Total weight: <strong>{nutrients.weight}g</strong>
                </p>
              )}

              {/* Main nutrients */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <div className="display-6">⚡</div>
                      <h3 className="mb-0">{nutrients.calories}</h3>
                      <small className="text-muted">Calories</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <div className="display-6">🥩</div>
                      <h3 className="mb-0">{nutrients.protein}g</h3>
                      <small className="text-muted">Protein</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <div className="display-6">🥑</div>
                      <h3 className="mb-0">{nutrients.fat}g</h3>
                      <small className="text-muted">Fat</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <div className="display-6">🌾</div>
                      <h3 className="mb-0">{nutrients.carbs}g</h3>
                      <small className="text-muted">Carbs</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional nutrients */}
              <h6 className="mb-3">Additional Information</h6>
              <ul className="list-group">
                {nutrients.fiber > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Fiber
                    <span className="badge bg-primary rounded-pill">{nutrients.fiber}g</span>
                  </li>
                )}
                {nutrients.sugar > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sugar
                    <span className="badge bg-primary rounded-pill">{nutrients.sugar}g</span>
                  </li>
                )}
                {nutrients.sodium > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sodium
                    <span className="badge bg-primary rounded-pill">{nutrients.sodium}mg</span>
                  </li>
                )}
                {nutrients.cholesterol > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Cholesterol
                    <span className="badge bg-primary rounded-pill">{nutrients.cholesterol}mg</span>
                  </li>
                )}
                {nutrients.saturatedFat > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Saturated Fat
                    <span className="badge bg-primary rounded-pill">{nutrients.saturatedFat}g</span>
                  </li>
                )}
                {nutrients.salt > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Salt
                    <span className="badge bg-primary rounded-pill">{nutrients.salt}g</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
