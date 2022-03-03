import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function InstructionsInput(props) {
	const handleChange = (e) => {
		props.onChange(e.target.value);
	}

	return (
		<div className={styles.instructionsInput}>
			<h3>Special Instructions</h3>
			<div className={styles.instructionsInputLine}>
			    <textarea name="instructions" onChange={handleChange} maxlength="150" />
		    </div>
		</div>
	);
}