function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-4">About This App</h1>
              
              <div className="mb-4">
                <h3 className="h4 mb-3">🍎 Edamam Food Search</h3>
                <p className="lead">
                  A simple and intuitive food nutrition search application built with React and powered by the Edamam Food Database API.
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
                  <li className="mb-2"><strong>API:</strong> Edamam Food Database</li>
                </ul>
              </div>

              <hr className="my-4" />

              <div className="mb-4">
                <h4>About Edamam</h4>
                <p>
                  This application uses the{' '}
                  <a 
                    href="https://www.edamam.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Edamam API
                  </a>
                  , which provides nutrition data from a comprehensive database of foods, including:
                </p>
                <ul>
                  <li>Generic foods</li>
                  <li>Branded/packaged foods</li>
                  <li>Restaurant items</li>
                  <li>Recipe ingredients</li>
                </ul>
                <p className="text-muted mt-3">
                  <small>
                    <strong>Note:</strong> The free tier of the Edamam API has rate limits. 
                    For production use, consider implementing a server-side proxy to secure your API keys.
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
                      href="https://developer.edamam.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Edamam Developer Portal
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
