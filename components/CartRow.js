import Link from 'next/link'
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider'
import styles from '../styles/Home.module.css'
import { productCatalog } from './Utils'

export default function CartInfo(props) {
    const cart = useContext(CartContext);
    const product = productCatalog.get(props.id);
    const removeRow = () => {
      cart.dispatch({type: 'remove', itemId: props.id})
    }
  	return (
        <div className={styles.cartRow}>
          <Image src={product.src} 
            width={50}
            height={50}
            objectFit="cover"/>
          <h4>{productCatalog.get(props.id).name}</h4>
          <span>{props.count}</span>
          <span onClick = {removeRow} className={styles.cartDelete}><DeleteIcon /></span>
        </div>
  	)
}