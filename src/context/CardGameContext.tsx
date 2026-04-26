import React, { createContext, useContext } from 'react';
import { GameState } from '../App';

interface CardGameContextValue {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const CardGameContext = createContext<CardGameContextValue | null>(null);

export function useCardGameContext(): CardGameContextValue {
    const context = useContext(CardGameContext);
    if (context === null) {
        throw new Error('useCardGameContext must be used within a CardGameContext provider');
    }

    return context;
}