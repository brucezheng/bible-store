import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function AddressInput(props) {
	let addressState = {};

	const handleChange = (e) => {
        addressState[e.target.name] = e.target.value;
        const formattedAddress = 
        	['name', 'address', 'city', 'zip']
        		.map((inputName) => addressState[inputName] || '')
	        	.filter(value => value.length > 0)
	        	.join(', ');
		props.onAddressChange(formattedAddress);
	}

	return (
		<div className={styles.addressInput}>
			<h3>{props.name}</h3>
			<div className={styles.addressLine}>
				<label htmlFor="name">Name</label>
			    <input name="name" onChange={handleChange} />
		    </div>
			<div className={styles.addressLine}>
				<label htmlFor="address">Address</label>
			    <input name="address" onChange={handleChange} />
		    </div>
			<div className={styles.addressLine}>
				<label htmlFor="city">City</label>
			    <input name="city" onChange={handleChange} />
		    </div>
			<div className={styles.addressLine}>
				<label htmlFor="zip">Zip</label>
			    <input name="zip" onChange={handleChange} />
		    </div>
		</div>
	);
}