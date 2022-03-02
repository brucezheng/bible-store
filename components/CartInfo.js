import Link from 'next/link'
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'
import CartRow from './CartRow'
import styles from '../styles/Home.module.css'
import { calculateTotal, formatCurrency } from './Utils'

export default function CartInfo() {
    const cart = useContext(CartContext);
    const cartList = Object.entries(cart.state.cartItems)
      .filter((cartItem) => cartItem[1] > 0)
      .map((cartItem) => {
        const [id, count] = cartItem;
        return (<CartRow key={id} id={id} count={count} />);
      });
      const subtotal = formatCurrency(calculateTotal(cart.state.cartItems));
  	return (
        <div className={styles.cartInfo}>
          {cartList}
          <div className={styles.cartSubtotal}>z
            <h3>Subtotal: {subtotal}</h3>
          </div>
        </div>
  	)
}