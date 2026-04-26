import React from 'react';
import styles from './Card.module.css';

interface CardProps {
	url: string | undefined
}

export default function Card({ url }: CardProps): React.ReactElement {	
	if (url !== undefined) {
		return (
			<div className={styles.card}>
				<img src={url} />
			</div>
		);
	} else {
		return (
			<div className={styles.card}>
			</div>
		);
	}
}