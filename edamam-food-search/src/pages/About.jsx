function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-4">About This App</h1>
              
              <div className="mb-4">
                <h3 className="h4 mb-3">🍎 Food Search App</h3>
                <p className="lead">
                  A simple and intuitive food nutrition search application built with React and powered by the Open Food Facts API - a free, open database.
                </p>
              </div>

              <hr className="my-4" />

              <div className="mb-4">
                <h4>Features</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">✨ Search thousands of foods from various sources</li>
                  <li className="mb-2">📊 View detailed nutritional information</li>
                  <li className="mb-2">⚡ Fast, debounced search with smart caching</li>
                  <li className="mb-2">🎯 Customizable serving sizes and measurements</li>
                  <li className="mb-2">📱 Responsive design that works on all devices</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4>Technology Stack</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><strong>Frontend:</strong> React + Vite</li>
                  <li className="mb-2"><strong>Routing:</strong> React Router</li>
                  <li className="mb-2"><strong>Styling:</strong> Bootstrap 5 (Bootswatch theme)</li>
                  <li className="mb-2"><strong>API:</strong> Open Food Facts (Free & Open)</li>
                </ul>
              </div>

              <hr className="my-4" />

              <div className="mb-4">
                <h4>About Open Food Facts</h4>
                <p>
                  This application uses the{' '}
                  <a 
                    href="https://world.openfoodfacts.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Open Food Facts API
                  </a>
                  , a free and open database of food products from around the world. It's like Wikipedia for food!
                </p>
                <ul>
                  <li><strong>No API Keys Required:</strong> Completely free to use</li>
                  <li><strong>Community-Driven:</strong> Data added by users worldwide</li>
                  <li><strong>Millions of Products:</strong> Branded foods, packaged goods, and more</li>
                  <li><strong>Global Coverage:</strong> Products from countries around the world</li>
                  <li><strong>Open Data:</strong> Licensed under ODbL</li>
                </ul>
                <p className="mt-3">
                  <strong>How it works:</strong> Users scan product barcodes and upload nutritional information 
                  from packaging. This creates a collaborative, ever-growing database that everyone can use for free.
                </p>
                <p className="text-muted mt-3">
                  <small>
                    <strong>Note:</strong> Data quality varies by product as it depends on community contributions. 
                    Some products have complete nutritional data while others may be partial. You can help by 
                    contributing to Open Food Facts!
                  </small>
                </p>
              </div>

              <hr className="my-4" />

              <div className="mb-4">
                <h4>Developer Information</h4>
                <p>
                  This project was created as a demonstration of modern web development practices, 
                  showcasing:
                </p>
                <ul>
                  <li>Component-based architecture</li>
                  <li>API integration with error handling</li>
                  <li>Performance optimization (debouncing, caching)</li>
                  <li>Responsive UI design</li>
                  <li>Accessibility best practices</li>
                </ul>
              </div>

              <div className="alert alert-info">
                <h5 className="alert-heading">🔗 Links</h5>
                <ul className="mb-0">
                  <li>
                    <a 
                      href="https://world.openfoodfacts.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Open Food Facts Website
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wiki.openfoodfacts.org/API" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Open Food Facts API Documentation
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://react.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      React Documentation
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vitejs.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Vite Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
