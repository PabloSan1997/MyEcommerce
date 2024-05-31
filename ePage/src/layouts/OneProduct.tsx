/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { readOneProductExtraReducer } from '../splice/extraReducer/productExtraReducer';

export function OneProduct() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.commerseReducer);
    useEffect(()=>{
        dispatch(readOneProductExtraReducer({token:state.token, id}));
    },[]);
  return  (
    <div className="one_product">
        {JSON.stringify(state.oneProduct)}
    </div>
  );
}
