import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type FetchPokemonListArgs = { offset: number; limit: number };
export type FetchError = Extract<
  FetchBaseQueryError,
  { status: 'FETCH_ERROR' }
>;
