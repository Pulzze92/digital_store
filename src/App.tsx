import './App.css';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<NotFound />} path="*" />
          <Route element={<FullPizza />} path="/pizza/:id" />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
