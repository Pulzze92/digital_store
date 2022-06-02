import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FullProduct: React.FC = () => {
  const [product, setProduct] = React.useState<{
    imageUrl: string;
    imageUrl2: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get('https://627fc5b2b1cc1b126259d638.mockapi.io/items/' + id);
        setProduct(data);
      } catch (error) {
        alert('Ошибка при получении данных');
        navigate('/');
      }
    }
    fetchProduct();
  }, []);

  if (!product) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={product.imageUrl} alt="pizza" />
      <h2>{product.title}</h2>
      <h4>{product.price} руб.</h4>
    </div>
  );
};

export default FullProduct;
