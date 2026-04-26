import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { CardValue, CardSuit } from './services/DeckOfCardsApi';

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function mockNewDeck(deckId = 'deck1', remaining = 52) {
    server.use(
        http.get('*/deck/new/shuffle/*', () =>
            HttpResponse.json({ success: true, deck_id: deckId, shuffled: true, remaining })
        )
    );
}

function mockDrawCard(value: CardValue, suit: CardSuit, remaining = 10) {
    server.use(
        http.get('*/deck/*/draw/*', () =>
            HttpResponse.json({
                success: true,
                deck_id: 'deck1',
                remaining,
                cards: [{ code: `${value[0]}${suit[0]}`, image: `http://img/${value}_${suit}.png`, value, suit }],
            })
        )
    );
}

it('test that button for drawing shows up', () => {
    render(<App />);
    expect(screen.getByText('Draw card')).toBeInTheDocument();
});

it('test that basic drawing works and that cards show up as expected', async () => {
    mockNewDeck();
    mockDrawCard('ACE', 'HEARTS');

    render(<App />);
    
    // first click
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).toBeDisabled());
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(1));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(2));
});

it('test that "Snap value!" gets shown when two cards with same value are drawn', async () => {
    mockNewDeck();
    
    render(<App />);

    // first click
    mockDrawCard('ACE', 'HEARTS');
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click
    mockDrawCard('ACE', 'SPADES');
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByText('Snap value!')).toBeInTheDocument());
});

it('test that "Snap suit!" gets shown when two cards with same suit are drawn', async () => {
    mockNewDeck();
    
    render(<App />);

    // first click
    mockDrawCard('ACE', 'HEARTS');
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click
    mockDrawCard('2', 'HEARTS');
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByText('Snap suit!')).toBeInTheDocument());
});

it('test that final score is shown when all cards are drawn and deck is empty', async () => {
    mockNewDeck();
    

    render(<App />);

    // first click
    mockDrawCard('ACE', 'HEARTS', 1);
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click makes the deck exhausted
    mockDrawCard('2', 'CLUBS', 0);
    fireEvent.click(screen.getByText('Draw card'));

    await waitFor(() => expect(screen.getByText('Value matches: 0')).toBeInTheDocument());
    expect(screen.getByText('Suit matches: 0')).toBeInTheDocument();
});

it('test that final score makes sense for values', async () => {
    mockNewDeck();
    

    render(<App />);

    // first click
    mockDrawCard('ACE', 'HEARTS', 1);
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click makes the deck exhausted
    mockDrawCard('ACE', 'CLUBS', 0);
    fireEvent.click(screen.getByText('Draw card'));

    await waitFor(() => expect(screen.getByText('Value matches: 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Suit matches: 0')).toBeInTheDocument());
});

it('test that final score makes sense for suits', async () => {
    mockNewDeck();
    

    render(<App />);

    // first click
    mockDrawCard('ACE', 'CLUBS', 1);
    fireEvent.click(screen.getByText('Draw card'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Draw card' })).not.toBeDisabled());

    // second click makes the deck exhausted
    mockDrawCard('2', 'CLUBS', 0);
    fireEvent.click(screen.getByText('Draw card'));

    await waitFor(() => expect(screen.getByText('Value matches: 0')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Suit matches: 1')).toBeInTheDocument());
});
