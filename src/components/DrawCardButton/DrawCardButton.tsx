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
        setState(prev => ({ ...prev, previousDrawnCard: null, currentDrawnCard: null, isLoading: true }));
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
        
        let valueMatch = false; 
        let suitMatch = false;
        if (state.previousDrawnCard === null) {
            valueMatch = state.currentDrawnCard?.value === newCard.cards[0].value;
            suitMatch = state.currentDrawnCard?.suit === newCard.cards[0].suit;
        } else {
            valueMatch = state.previousDrawnCard.value === newCard.cards[0].value;
            suitMatch = state.previousDrawnCard.suit === newCard.cards[0].suit;
        }

        let valueMatchCount = state.valueMatchCount;
        let suitMatchCount = state.suitMatchCount;
        if (valueMatch && !suitMatch) {
            valueMatchCount++;
        } else if (suitMatch && !valueMatch) {
            suitMatchCount++;
        }

        setState(prev => ({ 
            ...prev, 
            deck_id: newCard.deck_id, 
            remaining: newCard.remaining, 
            previousDrawnCard: state.currentDrawnCard, 
            currentDrawnCard: newCard.cards[0],
            suitMatchCount: suitMatchCount,
            valueMatchCount: valueMatchCount,
        }));
                isLoading: false,

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

    let content = (
        <button disabled={isButtonDisabled} className={styles.drawCardButton}  onClick={initOrDrawCard}>
            Draw card
        </button>
    );

    if (state.deck_id !== null && state.remaining === 0) {
        content = (
            <>
                <p>Value matches: {state.valueMatchCount}</p>
                <p>Suit matches: {state.suitMatchCount}</p>
            </>
        );
    } 

    return (
        <div className={styles.drawCardButtonContainer}>
            {content}
        </div>
    );
}