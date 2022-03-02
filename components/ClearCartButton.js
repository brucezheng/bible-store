import Link from 'next/link'
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'

export default function CartInfo() {
    const cart = useContext(CartContext);
    const onClickHandler = () => {
      cart.dispatch({type: 'clearAll'})
    }
  	return (
      <button onClick = {onClickHandler} className = {styles.button}>
      Clear cart
      </button>
  	)
}