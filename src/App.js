import './App.css';
import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from './redux/slices/filterSlice';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<NotFound />} path="*" />
            <Route element={<Cart />} path="/cart" />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
