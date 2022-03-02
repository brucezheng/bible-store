import Link from 'next/link'
import { getEncodedCartItems } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'

export default function CheckoutLink() {
	const href = '/checkout?cart=' + getEncodedCartItems();
	return (
            <Link href={href}>
              <a className={styles.card}>Pay</a>
            </Link>
    );
}