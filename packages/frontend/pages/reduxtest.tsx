// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import { selectCount,
  selectItems,
  selectTotal } from '../features/redux/selectors';
import { store } from '../features/redux/store';
import { addToBasket,
  addToBasketString,
  removeFromBasket } from '../features/slices/basketSlice';
import { decrement,
  increment,
  incrementByAmount } from '../features/slices/counterSlice';

function ReduxTest (): JSX.Element {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const count = useSelector(selectCount);

  console.log(store.getState());
  console.log(items);
  console.log(total);
  console.log(count);

  const addItemTobasket1 = () => {
    const product = {
      account: '1111111111',
      city: {
        city: 'bangkok',
        country: 'Thailand'
      },
      id: 1,
      pro: true
    };

    dispatch(addToBasket(product));
    console.log(store.getState());
  };

  const addItemTobasket2 = () => {
    const product = {
      account: '2222222222',
      city: {
        city: 'bangkok',
        country: 'Thailand'

      },
      id: 2,

      pro: true

    };

    dispatch(addToBasket(product));
    console.log(store.getState());
  };

  const removeItemFromBasket1 = () => {
    dispatch(removeFromBasket(1));
    console.log(store.getState());
  };

  const removeItemFromBasket2 = () => {
    dispatch(removeFromBasket(2));
    console.log(store.getState());
  };

  const addToBasketString666 = () => {
    dispatch(addToBasketString('666666'));
    console.log(store.getState());
  };

  const increment1 = () => {
    dispatch(increment());
    console.log(store.getState());
  };

  const decrement1 = () => {
    dispatch(decrement());
    console.log(store.getState());
  };

  const incrementByAmount1 = () => {
    dispatch(incrementByAmount(6));
    console.log(store.getState());
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col w-48 space-y-4'>
        <button className='bg-blue-200'
          onClick={addItemTobasket1}>Add 1 to Basket</button>
        <button className='bg-blue-200'
          onClick={addItemTobasket2}>Add 2 to Basket</button>
        <button className='bg-blue-200'
          onClick={removeItemFromBasket1}>Remove 1 From Basket</button>
        <button className='bg-blue-200'
          onClick={removeItemFromBasket2}>Remove 2 From Basket</button>
        <button className='bg-blue-200'
          onClick={addToBasketString666}>addToBasketString666</button>
        <button className='bg-blue-200'
          onClick={increment1}>increment1</button>
        <button className='bg-blue-200'
          onClick={decrement1}>decrement1</button>
        <button className='bg-blue-200'
          onClick={incrementByAmount1}>incrementByAmount1</button>
      </div>
    </div>

  );
}

export default ReduxTest;
