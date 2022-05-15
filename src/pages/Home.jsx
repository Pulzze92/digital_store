import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  let [isLoaded, setIsLoaded] = React.useState(false);
  const [category, setCategory] = React.useState(0);
  const [sort, setSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  console.log(sort, category);

  React.useEffect(() => {
    setIsLoaded(false);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-','');
    const categoryFilter = category > 0 ? `category=${category}` : '';

    fetch(`https://627fc5b2b1cc1b126259d638.mockapi.io/items?${categoryFilter}&sortBy=${sortBy}&order=${order}`)
    .then(res => res.json())
    .then((json) => setItems(json))
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [category, sort]);

  return (
   <div className='container'>
       <div className="content__top">
          <Categories category={category} onClickCategory={(c) => setCategory(c)}/>
          <Sort value={sort} onClickSort={(s) => setSort(s)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
          {
            isLoaded 
            ? items.map((el) => <PizzaBlock key={el.id} {...el}/>) 
            : [...new Array(20)].map((_, i) => <Skeleton key={i}/>)
          }
          
          </div>
   </div>
  )
}

export default Home;
