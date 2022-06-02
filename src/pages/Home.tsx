import banner from '../assets/img/1785.png';
import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';
import { catS } from '../components/Sort';

import { fetchProduct, selectProductData } from '../redux/slices/productsSlice';
import { useAppDispatch } from '../redux/store';
import { SearchProductParams } from '../redux/slices/productsSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectProductData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getProducts = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const categoryFilter = categoryId > 0 ? `categoryId=${categoryId}` : '';
    const searchByTyping = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchProduct({
        order,
        sortBy,
        categoryFilter,
        searchByTyping,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchProduct({} as SearchProductParams));
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    getProducts();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchProductParams;
      const sort = catS.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          searchValue: params.searchByTyping,
          categoryId: Number(params.categoryFilter),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : catS[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  let productList = items.map((obj: any) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(20)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="main__banner">
        <h1>loft мебель</h1>
        <h2>Современная и удобная мебель</h2>
        <img src={banner} alt="banner" />
      </div>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title"> Весь каталог </h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>К сожалению, произошла ошибка</h2>
            <p>Пожалуйста, свяжитесь с нами и сообщите о проблеме</p>
          </div>
        ) : (
          <div className="content__items"> {status === 'loading' ? skeletons : productList} </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
