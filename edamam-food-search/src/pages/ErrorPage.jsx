import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="col-md-6 text-center">
          <div className="error-content">
            <div className="display-1 mb-4">😕</div>
            <h1 className="display-4 fw-bold mb-3">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead text-muted mb-4">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-muted mb-4">
              It might have been moved or deleted, or you may have mistyped the URL.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                className="me-2" 
                viewBox="0 0 16 16"
                style={{ marginTop: '-3px' }}
              >
                <path 
                  fillRule="evenodd" 
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
