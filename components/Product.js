import React, { useContext } from 'react';
import Image from 'next/image'
import { CartContext } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'
import { formatCurrency } from '../utils/Utils'

export default function Product(props) {
    const cart = useContext(CartContext);

	const onClickHandler = () => {
		cart.dispatch({type: 'add', itemId: props.id})
	}

  	return (
		<div className={styles.product}>
		  <h4>{props.name}</h4>
		  <span>{formatCurrency(props.price)}</span>
		  <Image src={props.src} 
			      width={150}
			      height={150}
			      objectFit="cover"/>
	      <button onClick = {onClickHandler} className={styles.button}>
	      	Add to cart
	      </button>
	    </div>	
  	)
}