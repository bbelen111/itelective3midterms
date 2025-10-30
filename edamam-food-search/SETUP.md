# Setup Instructions

Follow these steps to set up and run the application:

## Step 1: Install Dependencies

### Option A: Install all at once (Recommended)
```powershell
npm run install:all
```

### Option B: Install separately
```powershell
# Install backend dependencies
npm run install:backend

# Install frontend dependencies
npm run install:frontend
```

## Step 2: Configure Environment Variables

### Backend Configuration
The backend `.env` file is already created with default values:
- `PORT=5000`
- `NODE_ENV=development`

### Frontend Configuration
The frontend `.env` file is already created with:
- `VITE_API_URL=http://localhost:5000/api`

You can modify these if needed.

## Step 3: Run the Application

### Option A: Run both frontend and backend together (Recommended)
```powershell
npm run dev
```

This will start:
- Backend API server at `http://localhost:5000`
- Frontend dev server at `http://localhost:5173`

### Option B: Run separately

In one terminal, start the backend:
```powershell
npm run dev:backend
```

In another terminal, start the frontend:
```powershell
npm run dev:frontend
```

## Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Testing the Backend API

You can test the backend API directly:

### Health Check
```
GET http://localhost:5000/api/health
```

### Search Foods
```
GET http://localhost:5000/api/foods/search?query=chocolate
```

### Get Random Food
```
GET http://localhost:5000/api/foods/random
```

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:
1. Change the PORT in `backend/.env`
2. Update `VITE_API_URL` in `frontend/.env` to match
3. Update the proxy target in `frontend/vite.config.js`

### CORS Issues
The backend is configured with CORS enabled by default. If you still experience CORS issues:
1. Check that the backend is running
2. Verify the `VITE_API_URL` in frontend `.env` matches your backend URL

### Module Not Found
Make sure you've installed all dependencies:
```powershell
npm run install:all
```

## Building for Production

To build the frontend for production:
```powershell
npm run build:frontend
```

The production build will be in `frontend/dist/`.

## Project Structure

```
edamam-food-search/
├── backend/
│   ├── controllers/
│   │   └── foodController.js
│   ├── routes/
│   │   └── foodRoutes.js
│   ├── services/
│   │   └── foodService.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiService.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Next Steps

1. Explore the Search page to look up food items
2. Try the Random page to discover new foods
3. Save items to your Library
4. Check out the About page for more information
