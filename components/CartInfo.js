import Link from 'next/link'
import { getCartItems } from '../providers/CartProvider'
import CartRow from './CartRow'
import styles from '../styles/Home.module.css'
import { calculateTotal, formatCurrency } from '../utils/Utils'

export default function CartInfo() {
    const cartItems = getCartItems();
    const cartList = Object.entries(cartItems)
      .filter((cartItem) => cartItem[1] > 0)
      .map((cartItem) => {
        const [id, count] = cartItem;
        return (<CartRow key={id} id={id} count={count} />);
      });
      const subtotal = formatCurrency(calculateTotal(cartItems));
  	return (
        <div className={styles.cartInfo}>
          {cartList}
          <div className={styles.cartSubtotal}>
            <h3>Subtotal: {subtotal}</h3>
          </div>
        </div>
  	)
}