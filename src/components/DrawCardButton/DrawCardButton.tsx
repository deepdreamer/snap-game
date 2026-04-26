import React, { useState } from 'react';
import styles from './DrawCardButton.module.css';
import { useCardGameContext } from '../../context/CardGameContext.js';
import { DrawCardResponse, fetchDrawCards, fetchNewDeck, ShuffledDeckResponse } from '../../services/DeckOfCardsApi';


export default function DrawCardButton(): React.ReactElement {
    const { state, setState } = useCardGameContext();
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    async function initOrDrawCard(): Promise<void>
    {
        if (isButtonDisabled) return;

        setButtonDisabled(true);
        let deckId = state.deck_id;
        if (deckId === null) {
            deckId = await initShuffledDeckOfCards();
        }

        await drawCard(deckId);


        setButtonDisabled(false);

    }

    async function drawCard(deckId: string): Promise<void>
    {
        const newCard: DrawCardResponse = await fetchDrawCards(deckId, 1);

        setState(prev => ({ 
            ...prev, 
            deck_id: newCard.deck_id, 
            remaining: newCard.remaining, 
            previousDrawnCard: state.currentDrawnCard, 
            currentDrawnCard: newCard.cards[0] 
        }));

    }

    async function initShuffledDeckOfCards(): Promise<string> {

        const newDeck: ShuffledDeckResponse = await fetchNewDeck();
        
        setState(prev => ({ 
            ...prev, 
            deck_id: newDeck.deck_id, 
            remaining: newDeck.remaining, 
            shuffled: true 
        }));

        return newDeck.deck_id;

    }

    return (
        <div className={styles.drawCardButtonContainer} onClick={initOrDrawCard}>
            <button disabled={isButtonDisabled} className={styles.drawCardButton}>
            Draw card
            </button>
        </div>
    );
}