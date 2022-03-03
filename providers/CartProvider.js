import React, { Context, createContext, useReducer, useEffect, useContext } from 'react';
import { decodeCartItems, encodeCartItems } from '../utils/Utils'

const CartContext = React.createContext({});

const initialState = {encodedCartItems: '', count: 0};

function getCartItems() {
    const cartContext = useContext(CartContext);
    return decodeCartItems(cartContext.state.encodedCartItems || '');
}

function getEncodedCartItems() {
    const cartContext = useContext(CartContext);
    return cartContext.state.encodedCartItems;
}

function addItem(state, action) {
	const addItemId = action.itemId;
	const cartItems = decodeCartItems(state.encodedCartItems || '');
	cartItems[addItemId] = (cartItems[addItemId] || 0) + 1;
	console.log(encodeCartItems(cartItems));
	return {encodedCartItems: encodeCartItems(cartItems), count: state.count + 1};
}

function removeItem(state, action) {
	const clearItemId = action.itemId;
	const cartItems = decodeCartItems(state.encodedCartItems || '');
	const newCount = state.count - (cartItems[clearItemId] || 0);
	cartItems[clearItemId] = 0;
	console.log(encodeCartItems(cartItems));
	return {encodedCartItems: encodeCartItems(cartItems), count: newCount};
}

function reducer(state, action) {
	switch (action.type) {
		case 'init':
			return action.value;
		case 'add':
			return addItem(state, action);
		case 'remove':
			return removeItem(state, action);
		case 'clearAll':
			return {encodedCartItems: '', count: 0};
		default:
			throw new Error();
	}

}

const CartProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Initialize cart if found in local storage
	useEffect(() => {
	   if (JSON.parse(localStorage.getItem("Cart"))) { 
	      dispatch({ 
	         type: 'init', 
	         value: JSON.parse(localStorage.getItem("Cart")),
	      });
	   }
	}, []);

	useEffect(() => {
		if (state !== initialState) {
			localStorage.setItem("Cart", JSON.stringify(state));
		}
	}, [state]);

	return (
		<CartContext.Provider
		  value={{
		  	state,
		  	dispatch,
		  }}>
			{children}
		</CartContext.Provider>
	)
}

export { CartContext, CartProvider, getCartItems, getEncodedCartItems };