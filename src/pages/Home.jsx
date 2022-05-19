import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

export const Home = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);

  const [items, setItems] = React.useState([]);
  let [isLoaded, setIsLoaded] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  const searchValue = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoaded(false);

    const order = sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.replace('-', '');
    const categoryFilter = category > 0 ? `category=${category}` : '';
    const searchByTyping = searchValue.searchValue.split('').join('');

    axios
      .get(
        `https://627fc5b2b1cc1b126259d638.mockapi.io/items?page=${currentPage}&limit=4&${categoryFilter}&sortBy=${sortBy}&order=${order}&search=${searchByTyping}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [category, sort, searchValue, currentPage]);

  let pizzaList = items.map((el) => <PizzaBlock key={el.id} {...el} />);

  const skeletons = [...new Array(20)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title"> Все пиццы </h2>
      <div className="content__items"> {isLoaded ? pizzaList : skeletons} </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
