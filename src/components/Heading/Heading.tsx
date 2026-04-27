import React from 'react';
import styles from './Heading.module.css';
import { useCardGameContext } from '../../context/CardGameContext';

export default function Heading(): React.ReactElement {
    const { state } = useCardGameContext();
    let remainingCountMessage = state.remaining + ' cards remaining';

    return (
        <div className={styles.heading}>
            <p className={styles.logoText}>SNAP!</p>
            <p className={styles.remainingCount}>{remainingCountMessage}</p>
            <p className={styles.snapLikelyhood}>Suite snap likelyhood: <strong>{state.suitSnapLikelyhood}</strong> / Value snap likelyhood: <strong>{state.valueSnapLikelyhood}</strong></p>
            <div className={styles.headingButtons}>
                <div className={styles.button} />
                <div className={styles.button} />
                <div className={`${styles.button} ${styles.blueButton}`} />
            </div>
        </div>
    );
}