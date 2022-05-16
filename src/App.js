import './App.css';
import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route element={<Home searchValue={searchValue} />} path="/" />
            <Route element={<NotFound />} path="*" />
            <Route element={<Cart />} path="/cart" />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
