import Link from 'next/link'
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'

export default function CartInfo() {
    const cart = useContext(CartContext);
    const onClickHandler = () => {
      cart.dispatch({type: 'clear'})
    }
  	return (
        <p className={styles.description}>
          You have {cart.state.count} items in cart.
          <button onClick = {onClickHandler}>
          Clear cart
          </button>
        </p>
  	)
}