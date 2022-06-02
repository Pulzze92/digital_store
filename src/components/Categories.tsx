import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

const categories = ['Все', 'Шкафы', 'Кровати', 'Стулья', 'Диваны', 'Столы'];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={categoryId === i ? 'active' : ''}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
