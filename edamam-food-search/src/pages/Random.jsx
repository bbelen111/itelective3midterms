import React, { useEffect, useState } from 'react';
import { getRandomFood, getFoodNutrients } from '../api/edamam';

function Random() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nutrients, setNutrients] = useState(null);

  const fetchRandom = async () => {
    setLoading(true);
    setError(null);
    setNutrients(null);
    try {
      const result = await getRandomFood();
      if (!result) {
        setError('No random item found. Try again.');
        setItem(null);
      } else {
        setItem(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch random food');
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  const handleShowNutrients = async () => {
    if (!item) return;
    try {
      const n = await getFoodNutrients(item.foodId, item.label);
      setNutrients(n);
    } catch (err) {
      setError(err.message || 'Failed to fetch nutrients');
    }
  };

  const saveToLibrary = () => {
    if (!item) return;
    try {
      const raw = JSON.parse(localStorage.getItem('savedFoods') || '[]');
      // Avoid duplicates by foodId
      if (!raw.some(f => f.foodId === item.foodId)) {
        raw.push({
          foodId: item.foodId,
          label: item.label,
          brand: item.brand,
          image: item.image
        });
        localStorage.setItem('savedFoods', JSON.stringify(raw));
      }
    } catch (err) {
      console.warn('Failed to save to library', err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Random Food</h2>
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={fetchRandom} disabled={loading}>
          {loading ? 'Loading...' : 'Show another'}
        </button>
        <button className="btn btn-primary" onClick={saveToLibrary} disabled={!item}>
          Save to library
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!item && !loading && <p>No item to show.</p>}

      {item && (
        <div className="card mb-3" style={{ maxWidth: 900 }}>
          <div className="row g-0">
            {item.image && (
              <div className="col-md-4">
                <img src={item.image} className="img-fluid rounded-start" alt={item.label} />
              </div>
            )}
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.label}</h5>
                {item.brand && <p className="card-text"><small className="text-muted">{item.brand}</small></p>}
                {item.category && <p className="card-text">Category: {item.category}</p>}
                {item.servingSize && <p className="card-text">Serving: {item.servingSize}</p>}

                <div className="mt-3">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleShowNutrients}>
                    Show nutrients
                  </button>
                </div>

                {nutrients && (
                  <div className="mt-3">
                    <h6>Nutrients</h6>
                    <ul>
                      <li>Calories: {nutrients.calories}</li>
                      <li>Protein: {nutrients.protein} g</li>
                      <li>Fat: {nutrients.fat} g</li>
                      <li>Carbs: {nutrients.carbs} g</li>
                      <li>Fiber: {nutrients.fiber} g</li>
                      <li>Sugar: {nutrients.sugar} g</li>
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Random;
