import Link from 'next/link'
import { getEncodedCartItems, getCartItems } from '../providers/CartProvider'
import { calculateTotal } from '../utils/Utils'
import styles from '../styles/Home.module.css'

export default function CheckoutLink() {
	const href = '/checkout?cart=' + getEncodedCartItems();
	if (calculateTotal(getCartItems()) > 0.5) {
		return (
	            <Link href={href}>
	              <a className={styles.card}>Pay</a>
	            </Link>
	    );
	}
	return (
            <Link href='/'>
              <a className={styles.card}>Return to Store</a>
            </Link>
    );
}