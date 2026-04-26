import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

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

function mockDrawCard(value: string, suit: string, remaining = 10) {
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
