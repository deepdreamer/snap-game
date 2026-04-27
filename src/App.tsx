import Card from './components/Card/Card';
import Spinner from './components/Spinner/Spinner';
import { useState } from 'react';
import MainContainer from './components/MainContainer/MainContainer';
import './App.css';
import DrawCardButton from './components/DrawCardButton/DrawCardButton';
import { CardGameContext } from './context/CardGameContext';
import { CardSuit, CardValue } from './services/DeckOfCardsApi';
import MatchMessage from './components/MatchMessage/MatchMessage';
import Heading from './components/Heading/Heading';

export interface GameState {
    deck_id: string | null;
    shuffled: boolean;
    remaining: number;
    previousDrawnCard: null | DrawnCard;
    currentDrawnCard: null | DrawnCard;
    valueMatchCount: number;
    suitMatchCount: number;
    drawnCards: Array<DrawnCard> | null;
    valueSnapLikelyhood: number,
    suitSnapLikelyhood: number,
    isLoading: boolean,
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
        remaining: 52,
        previousDrawnCard: null,
        currentDrawnCard: null,
        valueMatchCount: 0,
        suitMatchCount: 0,
        drawnCards: null,
        valueSnapLikelyhood: parseFloat((1/13).toFixed(2)), // 4/52 (4 cards of given value / 52 cards total)
        suitSnapLikelyhood: parseFloat((1/4).toFixed(2)), // 13/52 (13 cards of given suit / 52 cards total)
        isLoading: false,
    };

    const [cardGameState, setCardGameState] = useState<GameState>(defaultGameState);


    return (
        <>
            <CardGameContext value={{ state: cardGameState, setState: setCardGameState }}>
                <MainContainer>
					<Heading />
					<MatchMessage />
                    {cardGameState.isLoading ? <Spinner /> : (
                        <>
                            <Card url={cardGameState.previousDrawnCard?.image} />
                            <Card url={cardGameState.currentDrawnCard?.image} />
                        </>
                    )}
                    <DrawCardButton />
                </MainContainer>
            </CardGameContext>
        </>
    )
}

export default App
