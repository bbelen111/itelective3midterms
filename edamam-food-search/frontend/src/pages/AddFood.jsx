import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFoodForm from '../components/AddFoodForm';
import { createFoodItem } from '../api/apiService';
import '../App.css';

const AddFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createFoodItem(formData);
      console.log('Food item created:', result);
      setSuccess(true);
      
      // Show success message for 2 seconds then redirect to library
      setTimeout(() => {
        navigate('/library');
      }, 2000);
    } catch (err) {
      console.error('Error creating food item:', err);
      setError(err.message || 'Failed to add food item. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="add-food-page">
      <div className="page-header">
        <h1>Add New Food Item</h1>
        <p className="subtitle">Add a custom food item to your personal library</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <strong>Success!</strong> Food item added successfully. Redirecting to library...
        </div>
      )}

      <div className="form-container">
        <AddFoodForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      <style jsx>{`
        .add-food-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }

        .page-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .page-header h1 {
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
        }

        .form-container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .alert {
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .alert-error {
          background-color: #fee;
          border: 1px solid #fcc;
          color: #c33;
        }

        .alert-success {
          background-color: #efe;
          border: 1px solid #cfc;
          color: #3c3;
        }

        .alert strong {
          font-weight: 600;
        }

        :global(.add-food-form) {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        :global(.form-section) {
          border-bottom: 1px solid #e1e8ed;
          padding-bottom: 25px;
        }

        :global(.form-section:last-of-type) {
          border-bottom: none;
        }

        :global(.form-section h3) {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.3rem;
          font-weight: 600;
        }

        :global(.form-grid) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        :global(.form-group) {
          display: flex;
          flex-direction: column;
        }

        :global(.form-group.full-width) {
          grid-column: 1 / -1;
        }

        :global(.form-group label) {
          font-weight: 500;
          color: #34495e;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        :global(.form-group .required) {
          color: #e74c3c;
        }

        :global(.form-group input),
        :global(.form-group textarea) {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        :global(.form-group input:focus),
        :global(.form-group textarea:focus) {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        :global(.form-group textarea) {
          resize: vertical;
          font-family: inherit;
        }

        :global(.form-actions) {
          display: flex;
          gap: 15px;
          justify-content: center;
          padding-top: 10px;
        }

        :global(.btn-primary),
        :global(.btn-secondary) {
          padding: 12px 30px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        :global(.btn-primary) {
          background-color: #3498db;
          color: white;
        }

        :global(.btn-primary:hover:not(:disabled)) {
          background-color: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        :global(.btn-secondary) {
          background-color: #95a5a6;
          color: white;
        }

        :global(.btn-secondary:hover:not(:disabled)) {
          background-color: #7f8c8d;
        }

        :global(.btn-primary:disabled),
        :global(.btn-secondary:disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .add-food-page {
            padding: 15px;
          }

          .form-container {
            padding: 20px;
          }

          :global(.form-grid) {
            grid-template-columns: 1fr;
          }

          :global(.form-actions) {
            flex-direction: column;
          }

          :global(.btn-primary),
          :global(.btn-secondary) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddFood;
