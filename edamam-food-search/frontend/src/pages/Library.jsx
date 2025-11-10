import React, { useEffect, useState } from 'react';
import { getAllFoodItems, deleteFoodItem } from '../api/apiService';

function Library() {
  const [savedItems, setSavedItems] = useState([]);
  const [dbItems, setDbItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('database'); // 'database' or 'saved'

  useEffect(() => {
    // Load saved items from localStorage
    const raw = JSON.parse(localStorage.getItem('savedFoods') || '[]');
    setSavedItems(raw);
    
    // Load items from database
    loadDatabaseItems();
  }, []);

  const loadDatabaseItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getAllFoodItems();
      setDbItems(items);
    } catch (err) {
      console.error('Error loading food items:', err);
      setError(err.message || 'Failed to load food items from database');
    } finally {
      setLoading(false);
    }
  };

  const removeSavedItem = (foodId) => {
    const filtered = savedItems.filter(i => i.foodId !== foodId);
    setSavedItems(filtered);
    localStorage.setItem('savedFoods', JSON.stringify(filtered));
  };

  const clearSavedItems = () => {
    setSavedItems([]);
    localStorage.removeItem('savedFoods');
  };

  const removeDbItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      await deleteFoodItem(id);
      // Refresh the list
      await loadDatabaseItems();
    } catch (err) {
      console.error('Error deleting food item:', err);
      alert(err.message || 'Failed to delete food item');
    }
  };

  const formatNutrient = (value) => {
    if (value === null || value === undefined || value === 0) return '-';
    return Number(value).toFixed(1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Library</h2>

      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            My Food Items ({dbItems.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved from Search ({savedItems.length})
          </button>
        </li>
      </ul>

      {/* Database Items Tab */}
      {activeTab === 'database' && (
        <div>
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && dbItems.length === 0 && (
            <div className="alert alert-info">
              Your database is empty. <a href="/add-food" className="alert-link">Add your first food item</a>.
            </div>
          )}

          {!loading && !error && dbItems.length > 0 && (
            <div className="row">
              {dbItems.map(item => (
                <div className="col-md-6 col-lg-4" key={item.id}>
                  <div className="card mb-3 h-100">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        className="card-img-top" 
                        alt={item.product_name}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{item.product_name}</h5>
                      {item.brand && (
                        <p className="card-text">
                          <small className="text-muted">Brand: {item.brand}</small>
                        </p>
                      )}
                      {item.category && (
                        <p className="card-text">
                          <small className="text-muted">Category: {item.category}</small>
                        </p>
                      )}
                      
                      <div className="mt-3">
                        <h6 className="mb-2">Nutrition (per 100g):</h6>
                        <small>
                          <div className="d-flex justify-content-between">
                            <span>Calories:</span>
                            <strong>{formatNutrient(item.calories)} kcal</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Protein:</span>
                            <strong>{formatNutrient(item.protein)} g</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Carbs:</span>
                            <strong>{formatNutrient(item.carbohydrates)} g</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Fat:</span>
                            <strong>{formatNutrient(item.fat)} g</strong>
                          </div>
                        </small>
                      </div>
                      
                      {item.description && (
                        <p className="card-text mt-3">
                          <small>{item.description}</small>
                        </p>
                      )}
                      
                      <div className="mt-3">
                        <button 
                          className="btn btn-sm btn-outline-danger w-100" 
                          onClick={() => removeDbItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Items Tab */}
      {activeTab === 'saved' && (
        <div>
          {savedItems.length === 0 ? (
            <div className="alert alert-info">
              Your library is empty. Save items from the Random or Search pages.
            </div>
          ) : (
            <>
              <div className="mb-3">
                <button className="btn btn-sm btn-danger" onClick={clearSavedItems}>
                  Clear All Saved Items
                </button>
              </div>
              <div className="row">
                {savedItems.map(item => (
                  <div className="col-md-6" key={item.foodId}>
                    <div className="card mb-3">
                      <div className="row g-0">
                        {item.image && (
                          <div className="col-4">
                            <img 
                              src={item.image} 
                              className="img-fluid rounded-start" 
                              alt={item.label}
                              style={{ height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div className="col">
                          <div className="card-body">
                            <h5 className="card-title">{item.label}</h5>
                            {item.brand && (
                              <p className="card-text">
                                <small className="text-muted">{item.brand}</small>
                              </p>
                            )}
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => removeSavedItem(item.foodId)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Library;
