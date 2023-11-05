import { ReactNode } from 'react';

export interface SmallCardProps {
  id: number;
  name: string;
  description: string;
  page: number;
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
  currentPage: number;
  limit: number;
  setCurrentPage: (currentPage: number) => void;
}

export interface PageSizeSelectProps {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

export interface StatsRangeProps {
  skillName: string;
  skillValue: number;
}

export interface PaginationButtonProps {
  to: string;
  onClick: () => void;
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
