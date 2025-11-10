import { useState } from 'react';
import '../App.css';

const AddFoodForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    brand: '',
    category: '',
    image_url: '',
    serving_size: '',
    calories: '',
    protein: '',
    fat: '',
    carbohydrates: '',
    fiber: '',
    sugar: '',
    sodium: '',
    cholesterol: '',
    saturated_fat: '',
    salt: '',
    description: '',
    ingredients: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert empty strings to null and numbers to proper types
    const processedData = {
      ...formData,
      calories: formData.calories ? parseFloat(formData.calories) : 0,
      protein: formData.protein ? parseFloat(formData.protein) : 0,
      fat: formData.fat ? parseFloat(formData.fat) : 0,
      carbohydrates: formData.carbohydrates ? parseFloat(formData.carbohydrates) : 0,
      fiber: formData.fiber ? parseFloat(formData.fiber) : 0,
      sugar: formData.sugar ? parseFloat(formData.sugar) : 0,
      sodium: formData.sodium ? parseFloat(formData.sodium) : 0,
      cholesterol: formData.cholesterol ? parseFloat(formData.cholesterol) : 0,
      saturated_fat: formData.saturated_fat ? parseFloat(formData.saturated_fat) : 0,
      salt: formData.salt ? parseFloat(formData.salt) : 0
    };
    
    onSubmit(processedData);
  };

  const handleReset = () => {
    setFormData({
      product_name: '',
      brand: '',
      category: '',
      image_url: '',
      serving_size: '',
      calories: '',
      protein: '',
      fat: '',
      carbohydrates: '',
      fiber: '',
      sugar: '',
      sodium: '',
      cholesterol: '',
      saturated_fat: '',
      salt: '',
      description: '',
      ingredients: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-food-form">
      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="product_name">
              Product Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
              placeholder="e.g., Whole Wheat Bread"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Artisan Bakery"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Breads, Dairy, Beverages"
            />
          </div>

          <div className="form-group">
            <label htmlFor="serving_size">Serving Size</label>
            <input
              type="text"
              id="serving_size"
              name="serving_size"
              value={formData.serving_size}
              onChange={handleChange}
              placeholder="e.g., 100g, 1 cup"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Nutritional Information (per 100g)</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="calories">Calories (kcal)</label>
            <input
              type="number"
              step="0.01"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="protein">Protein (g)</label>
            <input
              type="number"
              step="0.01"
              id="protein"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fat">Fat (g)</label>
            <input
              type="number"
              step="0.01"
              id="fat"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="saturated_fat">Saturated Fat (g)</label>
            <input
              type="number"
              step="0.01"
              id="saturated_fat"
              name="saturated_fat"
              value={formData.saturated_fat}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbohydrates">Carbohydrates (g)</label>
            <input
              type="number"
              step="0.01"
              id="carbohydrates"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sugar">Sugar (g)</label>
            <input
              type="number"
              step="0.01"
              id="sugar"
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fiber">Fiber (g)</label>
            <input
              type="number"
              step="0.01"
              id="fiber"
              name="fiber"
              value={formData.fiber}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sodium">Sodium (mg)</label>
            <input
              type="number"
              step="0.01"
              id="sodium"
              name="sodium"
              value={formData.sodium}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cholesterol">Cholesterol (mg)</label>
            <input
              type="number"
              step="0.01"
              id="cholesterol"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salt">Salt (g)</label>
            <input
              type="number"
              step="0.01"
              id="salt"
              name="salt"
              value={formData.salt}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Details</h3>
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Brief description of the product..."
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="3"
            placeholder="List of ingredients..."
          />
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Add Food Item'}
        </button>
        <button 
          type="button" 
          className="btn-secondary"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default AddFoodForm;
