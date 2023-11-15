import { Character } from '../../model/characters';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadCharactersThunk } from './characters.thunks';

type CharactersState = {
  characters: Character[];
  charactersState: 'idle' | 'loading' | 'error';
};

const initialState: CharactersState = {
  characters: [],
  charactersState: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    update: (state: CharactersState, { payload }: PayloadAction<Character>) => {
      state.characters[
        state.characters.findIndex((item) => item.id === payload.id)
      ] = payload;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCharactersThunk.pending, (state: CharactersState) => {
        state.charactersState = 'loading';
        return state;
      })
      .addCase(
        loadCharactersThunk.fulfilled,
        (state: CharactersState, { payload }: PayloadAction<Character[]>) => {
          state.characters = payload;
          state.charactersState = 'idle';
          return state;
        }
      )
      .addCase(loadCharactersThunk.rejected, (state: CharactersState) => {
        state.charactersState = 'error';
        return state;
      })
      .addCase(
        charactersSlice.actions.update,
        (state: CharactersState, { payload }: PayloadAction<Character>) => {
          state.characters[
            state.characters.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      );
  },
});

export const { update } = charactersSlice.actions;
export default charactersSlice.reducer;
