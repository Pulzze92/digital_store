import React from 'react';

function Categories({category, onClickCategory}) {

    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
    <div className="categories">
      <ul>
        {
          categoriesList.map((el, i) => {
            return <li key={i} 
            onClick={() => onClickCategory(i)} 
            className={category == i ? 'active' : ''}>{el}</li>
      })
        }
      </ul> 
              </div>
              );
  }

  export default Categories;