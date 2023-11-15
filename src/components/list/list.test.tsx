import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import CharactersReducer from '../slices/characters.slice';
import { Character } from '../../model/characters';
import { useCharacter } from '../../hooks/use.notes';

jest.mock('../../hooks/use.notes');

describe('Given List component ', () => {
  describe('When we render it', () => {
    const store = configureStore({
      reducer: {
        charactersState: CharactersReducer,
      },
      preloadedState: {
        charactersState: {
          characters: [{ id: 1 } as Character],
        },
      },
    });

    const loadCharacters = jest.fn();
    (useCharacter as jest.Mock).mockReturnValue({
      loadCharacters,
    });

    render(
      <Provider store={store}>
        <List></List>
      </Provider>
    );
    test('Then it should be in the document', () => {
      const listElement = screen.getByRole('list');
      expect(listElement).toBeInTheDocument();
      expect(loadCharacters).toHaveBeenCalled();
    });
  });
});
