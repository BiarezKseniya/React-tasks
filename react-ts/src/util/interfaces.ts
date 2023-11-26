import { ReactNode } from 'react';
import { FetchError } from './types';

export interface SmallCardProps {
  id: number;
  name: string;
  description: string;
}

export interface PokemonListResponseData {
  count: number;
  results: PokemonListItemResponseData[];
}

export interface PokemonPageData {
  totalResults: number;
  pokemonData: PokemonSpeciesResponseData[];
}

export interface PokemonListItemResponseData {
  name: string;
  url: string;
}

export interface PokemonSpeciesResponseData {
  id: number;
  name: string;
  flavor_text_entries: Array<PokemonDescription>;
}

export interface PokemonDescription {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface ClickableIconProps {
  onClick: (e: React.FormEvent) => void;
}

export interface SkeletonProps {
  type: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface PaginationProps {
  totalResults: number;
  currentPage: number;
}

export interface StatsRangeProps {
  skillName: string;
  skillValue: number;
}

export interface PaginationButtonProps {
  to: string;
  disabled: boolean;
  children: ReactNode;
}

export interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className: string;
}

export interface PokemonDetailedData {
  name: string;
  weight: number;
  stats: PokemonStat[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface State {
  pokemonCards: ReactNode[];
}

export interface PageProps {
  data: PokemonPageData;
  error?: FetchError;
  pageLimit: number;
  searchValue: string;
  currentPage: number;
}

export interface ModalPageProps {
  modalData: PokemonDetailedData;
  modalError?: string;
}
