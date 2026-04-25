import React from 'react';
import styles from './DrawCardButton.module.css';

export default function DrawCardButton(): React.ReactElement {
  return (
    <div className={styles.drawCardButtonContainer}>
        <button className={styles.drawCardButton}>
        Draw card
        </button>
    </div>
  );
}