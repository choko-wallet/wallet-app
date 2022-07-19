import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { store } from '../redux/store';
import { useSelector, useDispatch } from "react-redux"
import {
  addToBasket, addToBasketString, removeFromBasket, selectItems, selectTotal,
} from "../redux/basketSlice2"
import {
  increment, decrement, incrementByAmount, selectCount
} from "../redux/counterSlice"

function ReduxTest() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const count = useSelector(selectCount);


  console.log(store.getState());
  console.log(items);
  console.log('id total: ' + total);
  console.log('count: ' + count);


  // useEffect(() => {
  //   if (!origin) return;  //挂上if 如果没拿到变量或不符合条件 直接跳出

  //   console.log('useEffect')

  // }, [origin])

  // 连接api或区块链 先异步交互 拿到数据再dispatch


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

  // increment, decrement, incrementByAmount,

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

  // const setOriginArr = () => {
  //   dispatch(setOrigin(['Thailand', 'Bangkok']));
  //   console.log(store.getState())
  // };
  // const setOriginStr = () => {
  //   dispatch(setOrigin('Thai'));
  //   console.log(store.getState())
  // };
  // const setOriginNull = () => {
  //   dispatch(setOrigin(null));
  //   console.log(store.getState())
  // };



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


        {/* increment1  decrement1   incrementByAmount1*/}
        {/* <button onClick={setOriginObj} className="bg-blue-200">setOriginObj</button>
        <button onClick={setOriginArr} className="bg-blue-200">setOriginArr</button>
        <button onClick={setOriginStr} className="bg-blue-200">setOriginStr</button>
        <button onClick={setOriginNull} className="bg-blue-200">setOriginNull</button> */}


      </div>
    </div>

  )
}

export default ReduxTest