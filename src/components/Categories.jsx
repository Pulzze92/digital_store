import React from 'react';

function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const setActiveCategory = (i) => {
      setActiveIndex(i);
    }

    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
    <div className="categories">
      <ul>
        {
          categoriesList.map((el, i) => {
            return <li key={i} onClick={() => setActiveCategory(i)} className={activeIndex === i ? 'active' : ''}>{el}</li>
      })
        }
      </ul> 
              </div>
              );
  }

  export default Categories;