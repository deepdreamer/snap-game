import React from 'react';
import styles from './MatchMessage.module.css';
import { useCardGameContext } from '../../context/CardGameContext';

export default function MatchMessage(): React.ReactElement {
    const { state } = useCardGameContext();
    const matchValue = state.currentDrawnCard?.value === state.previousDrawnCard?.value;
    const matchSuit = state.currentDrawnCard?.suit === state.previousDrawnCard?.suit;
    let message = undefined;

    if (matchSuit && matchValue) {
        message = '';
    } else if (matchValue && state.remaining > 0) {
        message = 'Snap value!';
    } else if (matchSuit && state.remaining > 0) {
        message = 'Snap suit!';
    }

    return (
        <div className={styles.matchMessage}>
            <p>{message}</p>
        </div>
    );
}