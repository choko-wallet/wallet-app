import React from 'react'
import Header from '../components/Header'
import { store } from '../features/redux/store';
import { useSelector, useDispatch } from "react-redux"

import {
  addToBasket, 
  addToBasketString, 
  removeFromBasket
} from "../features/slices/basketSlice";

import {
  increment, 
  decrement, 
  incrementByAmount
} from "../features/slices/counterSlice";

import { 
  selectCount,
  selectItems,
  selectTotal
} from '../features/redux/selectors';

function ReduxTest() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const count = useSelector(selectCount);


  console.log(store.getState());
  console.log(items);
  console.log('id total: ' + total);
  console.log('count: ' + count);

  const addItemTobasket1 = () => {
    const product = {
      id: 1,
      account: '1111111111',
      pro: true,
      city: {
        country: 'Thailand',
        city: 'bangkok'
      }
    };
    dispatch(addToBasket(product));
    console.log(store.getState())
  };
  const addItemTobasket2 = () => {
    const product = {
      id: 2,
      account: '2222222222',
      pro: true,
      city: {
        country: 'Thailand',
        city: 'bangkok'
      }
    };
    dispatch(addToBasket(product));
    console.log(store.getState())
  };

  const removeItemFromBasket1 = () => {
    dispatch(removeFromBasket(1));
    console.log(store.getState())
  };

  const removeItemFromBasket2 = () => {
    dispatch(removeFromBasket(2));
    console.log(store.getState())
  };

  const addToBasketString666 = () => {
    dispatch(addToBasketString("666666"));
    console.log(store.getState())
  };

  const increment1 = () => {
    dispatch(increment());
    console.log(store.getState())
  };

  const decrement1 = () => {
    dispatch(decrement());
    console.log(store.getState())
  };

  const incrementByAmount1 = () => {
    dispatch(incrementByAmount(6));
    console.log(store.getState())
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col w-48 space-y-4">
        <button onClick={addItemTobasket1} className="bg-blue-200">Add 1 to Basket</button>
        <button onClick={addItemTobasket2} className="bg-blue-200">Add 2 to Basket</button>
        <button onClick={removeItemFromBasket1} className="bg-blue-200">Remove 1 From Basket</button>
        <button onClick={removeItemFromBasket2} className="bg-blue-200">Remove 2 From Basket</button>
        <button onClick={addToBasketString666} className="bg-blue-200">addToBasketString666</button>
        <button onClick={increment1} className="bg-blue-200">increment1</button>
        <button onClick={decrement1} className="bg-blue-200">decrement1</button>
        <button onClick={incrementByAmount1} className="bg-blue-200">incrementByAmount1</button>
      </div>
    </div>

  )
}

export default ReduxTest