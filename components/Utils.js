import Codex from '../public/codex.jpeg'
import Scroll from '../public/scroll.jpeg'
import Passage from '../public/passage.jpeg'
import Iota from '../public/iota.png'
import { v4 as uuidv4 } from 'uuid';

const productCatalog = new Map([
	['1', {name: 'Codex', price: 3, src: Codex}],
	['2', {name: 'Scroll', price: 2, src: Scroll}],
	['3', {name: 'Passage', price: 1.5, src: Passage}],
	['4', {name: 'Jot or Tittle', price: 0.50, src: Iota}]
]);

function formatCurrency(num) {
	return  Intl.NumberFormat("en-US", {
	    style: "currency",
	    currency: "USD",
	}).format(num);
}

function encodeCartItems(cartItems) {
	if (!cartItems) {
		return '';
	}
	return btoa(JSON.stringify(cartItems || {}));
}

function decodeCartItems(encodedCartItems) {
	if (!encodedCartItems) {
		return {};
	}
	return JSON.parse(atob(encodedCartItems));
}

function calculateTotal(cartItems) {
	return Object.entries(cartItems)
      .map((cartItem) => {
        const [id, count] = cartItem;
        return productCatalog.get(id).price * count;
      })
      .reduce((prev, curr) => prev + curr, 0);
}

function generateOrderId() {
	return uuidv4();
}

export { productCatalog, calculateTotal, formatCurrency, encodeCartItems, decodeCartItems, generateOrderId };