import React, { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'

export default function Product() {
    const cart = useContext(CartContext);

	  const onClickHandler = () => {
	  	cart.dispatch({type: 'add'})
	  }

  	return (
      <button onClick = {onClickHandler}>
      	Product
      </button>
  	)
}