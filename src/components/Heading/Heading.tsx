import React from 'react';
import styles from './Heading.module.css';
import { useCardGameContext } from '../../context/CardGameContext';

export default function Heading(): React.ReactElement {
    const { state } = useCardGameContext();
    let remainingCountMessage = '';

    if (state.deck_id !== null) {
        remainingCountMessage = state.remaining + ' cards remaining';
    }
    

    return (
        <div className={styles.heading}>
            <p className={styles.logoText}>SNAP!</p>
            <p className={styles.remainingCount}>{remainingCountMessage}</p>
            <div className={styles.headingButtons}>
                <div className={styles.button} />
                <div className={styles.button} />
                <div className={`${styles.button} ${styles.blueButton}`} />
            </div>
        </div>
    );
}