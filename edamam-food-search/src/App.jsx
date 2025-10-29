import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FoodSearch from './pages/FoodSearch';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FoodSearch />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
