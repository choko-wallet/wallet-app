import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { decrement, increment } from '../redux/counterSlice'

import Header from '../components/Header'
import { store } from '../redux/store';



export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  console.log(store.getState());
  console.log(count);

  useEffect(() => {
    if (!count) return;  //挂上if 如果没拿到变量或不符合条件 直接跳出

    console.log('useEffect')

  }, [count])

  const increment1 = () => {
    dispatch(increment());
    console.log(store.getState())
  };



}