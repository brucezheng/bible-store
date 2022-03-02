import React, { Context, createContext, useReducer, useEffect } from 'react';

const CartContext = React.createContext({});

const initialState = {cartItems: {}, count: 0};

function addItem(state, action) {
	const addItemId = action.itemId;
	const cartItems = state.cartItems || {};
	let newCartItems = JSON.parse(JSON.stringify(cartItems));
	const cartItemCount = newCartItems[addItemId] || 0;
	newCartItems[addItemId] = cartItemCount + 1;
	return {cartItems: newCartItems, count: state.count + 1};
}

function removeItem(state, action) {
	const clearItemId = action.itemId;
	const cartItems = state.cartItems || {};
	let newCartItems = JSON.parse(JSON.stringify(cartItems));
	const newCount = state.count - (newCartItems[clearItemId] || 0);
	newCartItems[clearItemId] = 0;
	return {cartItems: newCartItems, count: newCount};
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
			return {cartItems: {}, count: 0};
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

export { CartContext, CartProvider };