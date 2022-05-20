import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCategory, setPageCount, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { catS } from '../components/Sort';

import { SearchContext } from '../App';

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);
  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const page = useSelector((state) => state.filter.page);

  const [items, setItems] = React.useState([]);
  let [isLoaded, setIsLoaded] = React.useState(false);

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  const fetchPizzas = () => {
    setIsLoaded(false);

    const order = sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.replace('-', '');
    const categoryFilter = category > 0 ? `category=${category}` : '';
    const searchByTyping = searchValue.searchValue.split('').join('');

    axios
      .get(
        `https://627fc5b2b1cc1b126259d638.mockapi.io/items?page=${page}&limit=4&${categoryFilter}&sortBy=${sortBy}&order=${order}&search=${searchByTyping}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  };

  const searchValue = React.useContext(SearchContext);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        category: category > 0 ? category : null,
        sort: sort.sortProperty,
        page,
      };

      const urlStr = qs.stringify(params, { skipNulls: true });

      navigate(`/?${urlStr}`);
    }

    if (!window.location.search) {
      fetchPizzas();
    }
  }, [category, sort.sortProperty, searchValue, page]);

  React.useEffect(() => {
    if (isMounted.current) {
      fetchPizzas();
    }
  }, [category, sort.sortProperty, searchValue, page]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = window.location.search.substring(1);
      const sort = catS.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
      } else {
        delete params.sort;
      }

      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, [location.search]);

  React.useEffect(() => {
    if (!window.location.search) {
      fetchPizzas();
    }
  }, []);

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
      <Pagination value={page} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
