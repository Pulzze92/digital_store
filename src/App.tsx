import './App.css';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { FullProduct } from './pages/FullProduct';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<NotFound />} path="*" />
          <Route element={<FullProduct />} path="/product/:id" />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
