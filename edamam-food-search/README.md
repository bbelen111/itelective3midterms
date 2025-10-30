# Food Search Application

Full-stack food search application with Node.js backend and React frontend.

## Project Structure

```
edamam-food-search/
├── backend/          # Node.js/Express backend
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── server.js     # Server entry point
│   └── package.json  # Backend dependencies
├── frontend/         # React frontend
│   ├── src/          # React components and pages
│   ├── public/       # Static assets
│   ├── index.html    # HTML entry point
│   └── package.json  # Frontend dependencies
└── package.json      # Root package.json with scripts
```

## Features

- Search for packaged foods using Open Food Facts API
- View detailed nutritional information
- Get random food suggestions
- Save favorite foods to library (localStorage)
- Responsive design with Bootstrap

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd edamam-food-search
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install individually:
```bash
npm run install:backend
npm run install:frontend
```

## Configuration

### Backend (.env)
Create a `.env` file in the `backend` directory:
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173

### Run Separately

Backend only:
```bash
npm run dev:backend
```

Frontend only:
```bash
npm run dev:frontend
```

## API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/foods/search?query={query}` - Search for foods
- `GET /api/foods/nutrients/:foodId?label={label}&quantity={quantity}&measureUri={measureUri}` - Get food nutrients
- `GET /api/foods/random` - Get random food
- `POST /api/foods/cache/clear` - Clear server cache

## Building for Production

Build the frontend:
```bash
npm run build:frontend
```

The build output will be in `frontend/dist/`.

## Technology Stack

### Backend
- Node.js
- Express.js
- CORS
- Open Food Facts API

### Frontend
- React 19
- React Router DOM
- Vite
- Bootstrap 5
- CSS3

## Project Features

1. **Search Page**: Search and browse food items with detailed nutritional information
2. **Random Page**: Discover random food items
3. **Library Page**: Save and manage your favorite foods
4. **About Page**: Information about the application

## API Integration

This application uses the [Open Food Facts](https://world.openfoodfacts.org/) API, which is:
- Free and open source
- No API key required
- Community-driven database of food products

## Development Notes

- The backend implements caching to reduce API calls
- The frontend uses environment variables for API configuration
- All API calls are proxied through the backend for better security and control

## License

MIT