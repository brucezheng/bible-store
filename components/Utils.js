import Codex from '../public/codex.jpeg'
import Scroll from '../public/scroll.jpeg'
import Passage from '../public/passage.jpeg'
import Iota from '../public/iota.png'

const productCatalog = new Map([
	['1', {name: 'Codex', price: 0.75, src: Codex}],
	['2', {name: 'Scroll', price: 0.50, src: Scroll}],
	['3', {name: 'Passage', price: 0.15, src: Passage}],
	['4', {name: 'Jot or Tittle', price: 0.05, src: Iota}]
]);

function formatCurrency(num) {
	return  Intl.NumberFormat("en-US", {
	    style: "currency",
	    currency: "USD",
	}).format(num);
}

function calculateTotal(cartItems) {
	return Object.entries(cartItems)
      .map((cartItem) => {
        const [id, count] = cartItem;
        return productCatalog.get(id).price * count;
      })
      .reduce((prev, curr) => prev + curr, 0);
}

export { productCatalog, calculateTotal, formatCurrency };