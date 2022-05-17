import React from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

export const Home = () => {
  const category = useSelector((state) => state.filter.category);
  const setCategory = () => {};

  const [items, setItems] = React.useState([]);
  let [isLoaded, setIsLoaded] = React.useState(false);
  // const [category, setCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sort, setSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const searchValue = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoaded(false);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const categoryFilter = category > 0 ? `category=${category}` : '';
    const searchByTyping = searchValue.searchValue.split('').join('');

    fetch(
      `https://627fc5b2b1cc1b126259d638.mockapi.io/items?page=${currentPage}&limit=4&${categoryFilter}&sortBy=${sortBy}&order=${order}&search=${searchByTyping}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [category, sort, searchValue, currentPage]);

  let pizzaList = items.map((el) => <PizzaBlock key={el.id} {...el} />);

  const skeletons = [...new Array(20)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} onClickCategory={(c) => setCategory(c)} />{' '}
        <Sort value={sort} onClickSort={(s) => setSort(s)} />{' '}
      </div>{' '}
      <h2 className="content__title"> Все пиццы </h2>{' '}
      <div className="content__items"> {isLoaded ? pizzaList : skeletons} </div>{' '}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
