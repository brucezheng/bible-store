import Link from 'next/link'
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'

export default function CartFooter() {
    const cart = useContext(CartContext);
  	return (
        <footer className={styles.footer}
          style={{visibility: cart.state.count > 0 ? 'visible' : 'hidden'}}>
          <Link href="/cart">
            <a>Cart ({cart.state.count})</a>
          </Link>
        </footer>
  	)
}