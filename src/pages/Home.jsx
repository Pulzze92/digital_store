import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCategory, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzasSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { catS } from '../components/Sort';

import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);

  const category = useSelector((state) => state.filter.category);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const page = useSelector((state) => state.filter.page);
  const { items, status } = useSelector((state) => state.pizza);

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  const getPizzas = async () => {
    const order = sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.replace('-', '');
    const categoryFilter = category > 0 ? `category=${category}` : '';
    const searchByTyping = searchValue.searchValue.split('').join('');

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        categoryFilter,
        searchByTyping,
        page,
      }),
    );

    window.scrollTo(0, 0);
  };

  const searchValue = React.useContext(SearchContext);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       category: category > 0 ? category : null,
  //       sort: sort.sortProperty,
  //       page,
  //     };

  //     const urlStr = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${urlStr}`);
  //   }

  //   if (!window.location.search) {
  //     getPizzas();
  //   }
  // }, [category, sort.sortProperty, searchValue, page]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     getPizzas();
  //   }
  // }, [category, sort.sortProperty, searchValue, page]);

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
      getPizzas();
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>К сожалению, произошла ошибка</h2>
          <p>Пожалуйста, свяжитесь с нами и сообщите о проблеме</p>
        </div>
      ) : (
        <div className="content__items"> {status === 'loading' ? pizzaList : skeletons} </div>
      )}

      <Pagination value={page} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
