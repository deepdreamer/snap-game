import React, { useState } from 'react';
import styles from './DrawCardButton.module.css';

interface ShuffledDeckResponse {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}

export default function DrawCardButton(): React.ReactElement {
    const [deck, setResponse] = useState<ShuffledDeckResponse | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    function drawCard(): void
    {
         if (isSubmitting) return;

         if (!isInitialized) {
            initShuffledDeckOfCards();
         }


    }

    async function initShuffledDeckOfCards(): Promise<ShuffledDeckResponse> {
       

        const url = `${import.meta.env.VITE_API_BASE_URL}/api/deck/new/shuffle/?deck_count=1`;

        setIsSubmitting(true);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch card: ${response.status} ${response.statusText}`);
        }

        setIsSubmitting(false);
        

        const deck: ShuffledDeckResponse = JSON.parse(await response.text());

        setResponse(deck);
        setIsInitialized(true);

        return deck;
    }

    return (
        <div className={styles.drawCardButtonContainer} onClick={drawCard}>
            <button disabled={isSubmitting} className={styles.drawCardButton}>
            Draw card
            </button>
        </div>
    );
}