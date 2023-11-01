import { ReactNode } from 'react';

export interface SmallCardProps {
  name: string;
  description: string;
}

export interface PokemonListResponseData {
  results: PokemonListItemResponseData[];
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
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
}
