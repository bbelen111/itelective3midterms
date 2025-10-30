import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="col-md-6 text-center">
          <div className="error-content">
            <h1 className="display-4 fw-bold mb-3">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead text-muted mb-4">
              The page does not exist.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
