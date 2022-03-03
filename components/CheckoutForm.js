import { useContext } from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import AddressInput from './AddressInput'
import InstructionsInput from './InstructionsInput'
import { CartContext } from '../providers/CartProvider'
import { generateOrderId, encodeString } from '../utils/Utils'
import styles from '../styles/Home.module.css'

export default function CheckoutForm(props) {
  const cart = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  let billingAddress;
  let mailingAddress;
  let instructions;
  const onBillingAddressChange = (newAddress) => {
  	billingAddress = newAddress;
  }
  const onMailingAddressChange = (newAddress) => {
  	mailingAddress = newAddress;
  }
  const onInstructionsChange = (newInstructions) => {
  	instructions = newInstructions;
  }
	const saveOrderInfo = async (orderInfo) => {
			let saveOrderRequest = 
					`/api/save?orderId=${orderInfo.id}&paymentId=${props.paymentId}&`
							+ `encodedCartItems=${props.encodedCartItems}&cartTotalCents=${props.cartTotalCents}`
			if (billingAddress) {
				saveOrderRequest = saveOrderRequest + `&encodedBillingAddress=${encodeString(billingAddress)}`;
			}
			if (mailingAddress) {
				saveOrderRequest = saveOrderRequest + `&encodedMailingAddress=${encodeString(mailingAddress)}`;
			}
			if (instructions) {
				saveOrderRequest = saveOrderRequest + `&encodedInstructions=${encodeString(instructions)}`;
			}
      const saveOrderResponse = await fetch(saveOrderRequest);
      const responseData = await saveOrderResponse.json();
      return responseData.status;
  };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

		const orderId = generateOrderId();
		await saveOrderInfo({id: orderId});
		cart.dispatch({type: 'clearAll'});
		const return_url = process.env.NEXT_PUBLIC_HOST + '/summary?orderId=' + orderId;
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
    	<InstructionsInput onChange={onInstructionsChange} />
    	<AddressInput name='Mailing Address' onAddressChange={onMailingAddressChange} />
    	<AddressInput name='Billing Address' onAddressChange={onBillingAddressChange} />
      <PaymentElement />
      <button className={styles.button} disabled={!stripe}>Submit</button>
    </form>
  );
};