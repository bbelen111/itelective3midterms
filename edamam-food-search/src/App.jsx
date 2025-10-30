import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FoodSearch from './pages/FoodSearch';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Random from './pages/Random';
import Library from './pages/Library';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FoodSearch />} />
          <Route path="random" element={<Random />} />
          <Route path="library" element={<Library />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
