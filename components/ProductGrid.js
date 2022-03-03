import Product from './Product'
import { productCatalog } from '../utils/Utils'
import styles from '../styles/Home.module.css'

export default function ProductGrid(props) {
	const productList = Array.from(productCatalog.entries()).map((productEntry) => {
		const [id, product] = productEntry;
		return (
			<Product id={id} key={product.name} name={product.name} price={product.price} src={product.src}/>
		);
		
	}
	);

  	return (
        <div className={styles.grid}>
        {productList}
        </div>
  	)
}