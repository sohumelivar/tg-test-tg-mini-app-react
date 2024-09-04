import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
  {
    id: 1,
    title: "Электрический чайник",
    price: 2999,
    description: "Быстрое кипячение воды"
  },
  {
    id: 2,
    title: "Зарядное устройство",
    price: 1599,
    description: "Быстрая зарядка"
  },
  {
    id: 3,
    title: "Беспроводные наушники",
    price: 4999,
    description: "Качественный звук без проводов"
  },
  {
    id: 4,
    title: "Настольная лампа",
    price: 2499,
    description: "Регулировка яркости"
  },
  {
    id: 5,
    title: "Портативный аккумулятор",
    price: 3999,
    description: "10000 мАч с быстрой зарядкой"
  },
  {
    id: 6,
    title: "Умный дом",
    price: 8999,
    description: "Контроль умных устройств"
  },
  {
    id: 7,
    title: "Электрическая зубная щетка",
    price: 1999,
    description: "Вибрационная система очистки"
  },
  {
    id: 8,
    title: "Беспроводная мышь",
    price: 1499,
    description: "Эргономичный дизайн"
  },
  {
    id: 9,
    title: "USB-C хаб",
    price: 3499,
    description: "Много портов для подключения"
  },
  {
    id: 10,
    title: "Наушники с шумоподавлением",
    price: 5999,
    description: "Изоляция внешних шумов"
  }
];

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.price, 0);
}

export default function ProductList() {
  const [addedItems, setAddedItems] = useState([]);
  const { tg } = useTelegram();

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      });
    }
  };

  return (
    <div className="list">
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className="item"
        />
      ))}
    </div>
  );
}