/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readInfoUserExtraReducer } from "../splice/extraReducer/userExtraReducers";

export  function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.commerseReducer);
  useEffect(()=>{
    dispatch(readInfoUserExtraReducer({token:state.token}));
  },[]);
  return (
    <div className="hola">Este es home</div>
  );
}
