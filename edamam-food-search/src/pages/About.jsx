function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-4">About Page</h1>
              
              <div className="mb-4">
                <h3 className="h4 mb-3">Packaged Food Search App</h3>
                <p className="lead">
                  a packaged food finder using Open Food Facts API
                </p>
              </div>

              <hr className="my-4" />

              <div className="mb-4">
                <h4>Features</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">Search thousands of foods from community fed open sources</li>
                  <li className="mb-2">View detailed nutritional information</li>
                  <li className="mb-2">Fast, debounced search with smart caching</li>
                  <li className="mb-2">Customizable serving sizes and measurements</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4>Technology Stack</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><strong>Frontend:</strong> React + Vite</li>
                  <li className="mb-2"><strong>Routing:</strong> React Router</li>
                  <li className="mb-2"><strong>API: </strong> 
                  <a href="https://world.openfoodfacts.org/" target="_blank" rel="noopener noreferrer">Open Food Facts API</a>
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
