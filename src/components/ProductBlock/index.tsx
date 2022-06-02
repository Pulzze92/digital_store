import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, CartItem, selectCartItemById } from '../../redux/slices/cartSlice';

const typeNames = ['темный', 'светлый'];

type ProductBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  // types: number[];
  rating: number;
};

const ProductBlock: React.FC<ProductBlockProps> = ({ id, title, price, imageUrl, rating }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [type, setType] = React.useState<number>(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      // type: typeNames[type],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="product-block-wrapper">
      <div className="product-block">
        <Link key={id} to={`/Product/${id}`}>
          <img className="product-block__image" src={imageUrl} alt="Product" />
          <h4 className="product-block__title">{title}</h4>
        </Link>
        <div className="product-block__bottom">
          <div className="product-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
