import Card from './components/Card/Card';
import { useState } from 'react';
import MainContainer from './components/MainContainer/MainContainer';
import './App.css';
import DrawCardButton from './components/DrawCardButton/DrawCardButton';
import { CardGameContext } from './context/CardGameContext';
import { CardSuit, CardValue } from './services/DeckOfCardsApi';

export interface GameState {
    deck_id: string | null;
    shuffled: boolean;
    remaining: number;
    previousDrawnCard: null | DrawnCard;
    currentDrawnCard: null | DrawnCard;
}

export interface DrawnCard {
    image: string,
    value: CardValue,
    suit: CardSuit,
}

function App(): React.ReactElement {
    const defaultGameState: GameState = {
        deck_id: null,
        shuffled: false,
        remaining: 0,
        previousDrawnCard: null,
        currentDrawnCard: null,
    };

    const [cardGameState, setCardGameState] = useState<GameState>(defaultGameState);


    return (
        <>
            <CardGameContext value={{ state: cardGameState, setState: setCardGameState }}>
                <MainContainer>
                    <Card url={cardGameState.previousDrawnCard?.image} />
                    <Card url={cardGameState.currentDrawnCard?.image} />
                    <DrawCardButton />
                </MainContainer>
            </CardGameContext>
        </>
    )
}

export default App
