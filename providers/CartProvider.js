import React, { Context, createContext, useReducer, useEffect } from 'react';

const CartContext = React.createContext({});

function reducer(state, action) {
	console.log(action);
	switch (action.type) {
		case 'init':
			return action.value;
		case 'add':
			return {count: state.count + 1};
		case 'clear':
			return {count: 0};
		default:
			throw new Error();
	}

}

const initialState = {count: 0};

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