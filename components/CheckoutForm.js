import { useContext } from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { CartContext } from '../providers/CartProvider'
import { generateOrderId } from '../components/Utils'
import styles from '../styles/Home.module.css'

export default function CheckoutForm() {
  const cart = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

		cart.dispatch({type: 'clearAll'})
		const return_url = process.env.NEXT_PUBLIC_HOST + '/summary?orderId=' + generateOrderId();
		console.log(return_url);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {return_url},
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form className={styles.checkoutForm} onSubmit={handleSubmit}>
      <PaymentElement />
      <button className={styles.button} disabled={!stripe}>Submit</button>
    </form>
  );
};