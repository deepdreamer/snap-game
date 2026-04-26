export interface ShuffledDeckResponse {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}

export interface CardImages {
    svg: string;
    png: string;
}

export type CardSuit = 'HEARTS' | 'SPADES' | 'CLUBS' | 'DIAMONDS';

export type CardValue = 'ACE' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'JACK' | 'QUEEN' | 'KING';

export interface Card {
    code: string;
    image: string;
    images: CardImages;
    value: CardValue;
    suit: CardSuit;
}

export interface DrawCardResponse {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchNewDeck(): Promise<ShuffledDeckResponse> {
    const response = await fetch(`${BASE_URL}/api/deck/new/shuffle/?deck_count=1`);
    if (!response.ok) throw new Error(`Failed to shuffle deck: ${response.status}`);

    return response.json();
}

export async function fetchDrawCards(deckId: string, count: number = 1): Promise<DrawCardResponse> {
    const response = await fetch(`${BASE_URL}/api/deck/${deckId}/draw/?count=${count}`);
    if (!response.ok) throw new Error(`Failed to draw card: ${response.status}`);

    return response.json();
}