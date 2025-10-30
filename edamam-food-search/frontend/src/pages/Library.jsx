import React, { useEffect, useState } from 'react';

function Library() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('savedFoods') || '[]');
    setItems(raw);
  }, []);

  const removeItem = (foodId) => {
    const filtered = items.filter(i => i.foodId !== foodId);
    setItems(filtered);
    localStorage.setItem('savedFoods', JSON.stringify(filtered));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem('savedFoods');
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Library</h2>

      {items.length === 0 ? (
        <div className="alert alert-info">Your library is empty. Save items from the Random or Search pages.</div>
      ) : (
        <>
          <div className="mb-3">
            <button className="btn btn-sm btn-danger" onClick={clearAll}>Clear library</button>
          </div>
          <div className="row">
            {items.map(item => (
              <div className="col-md-6" key={item.foodId}>
                <div className="card mb-3">
                  <div className="row g-0">
                    {item.image && (
                      <div className="col-4">
                        <img src={item.image} className="img-fluid rounded-start" alt={item.label} />
                      </div>
                    )}
                    <div className="col">
                      <div className="card-body">
                        <h5 className="card-title">{item.label}</h5>
                        {item.brand && <p className="card-text"><small className="text-muted">{item.brand}</small></p>}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.foodId)}>Remove</button>
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
  );
}

export default Library;
