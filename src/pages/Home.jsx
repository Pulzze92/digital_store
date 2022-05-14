import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
const [items, setItems] = React.useState([]);
  let [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch('https://627fc5b2b1cc1b126259d638.mockapi.io/items')
    .then(res => res.json())
    .then((json) => setItems(json))
    setIsLoaded(true);
  }, []);

  return (
   <>
       <div className="content__top">
          <Categories />
          <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
          {
            isLoaded 
            ? items.map((el) => <PizzaBlock key={el.id} {...el}/>) 
            : [...new Array(20)].map((_, i) => <Skeleton key={i}/>)
          }
          
          </div>
   </>
  )
}

export default Home;
