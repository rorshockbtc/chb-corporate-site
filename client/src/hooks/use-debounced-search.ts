import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface SearchFilters {
  searchTerm?: string;
  perspective?: string;
  learningStatus?: string;
  journeyStage?: string;
}

export function useDebouncedSearch(filters: SearchFilters, debounceMs: number = 300) {
  const [debouncedFilters, setDebouncedFilters] = useState<SearchFilters>(filters);

  // Debounce the filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [filters, debounceMs]);

  // Create query key based on filters using array segments for proper invalidation
  const queryKey = useMemo(() => {
    const keySegments = ['/api/creative/images'];
    
    // Add filter segments for proper cache invalidation
    if (debouncedFilters.searchTerm) {
      keySegments.push('search', debouncedFilters.searchTerm);
    }
    if (debouncedFilters.perspective && debouncedFilters.perspective !== 'all') {
      keySegments.push('perspective', debouncedFilters.perspective);
    }
    if (debouncedFilters.learningStatus && debouncedFilters.learningStatus !== 'all') {
      keySegments.push('learningStatus', debouncedFilters.learningStatus);
    }
    if (debouncedFilters.journeyStage && debouncedFilters.journeyStage !== 'all') {
      keySegments.push('journeyStage', debouncedFilters.journeyStage);
    }

    return keySegments;
  }, [debouncedFilters]);

  // Create URL with query parameters for the actual API call
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    
    if (debouncedFilters.searchTerm) params.set('searchTerm', debouncedFilters.searchTerm);
    if (debouncedFilters.perspective && debouncedFilters.perspective !== 'all') {
      params.set('perspective', debouncedFilters.perspective);
    }
    if (debouncedFilters.learningStatus && debouncedFilters.learningStatus !== 'all') {
      params.set('learningStatus', debouncedFilters.learningStatus);
    }
    if (debouncedFilters.journeyStage && debouncedFilters.journeyStage !== 'all') {
      params.set('journeyStage', debouncedFilters.journeyStage);
    }

    const paramString = params.toString();
    return paramString ? `/api/creative/images?${paramString}` : '/api/creative/images';
  }, [debouncedFilters]);

  // Use TanStack Query for caching and efficient refetching
  const result = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(apiUrl, { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: Object.keys(debouncedFilters).some(key => 
      debouncedFilters[key as keyof SearchFilters] && 
      debouncedFilters[key as keyof SearchFilters] !== 'all'
    ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...result,
    searchResults: (result.data as any)?.images || [],
    isSearching: result.isFetching,
    debouncedFilters,
  };
}

export function useImageSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    perspective: 'all',
    learningStatus: 'all',
    journeyStage: 'all',
  });

  const searchResult = useDebouncedSearch(filters);

  // Fallback to get all images when no filters are applied
  const allImagesQuery = useQuery({
    queryKey: ['/api/creative/images'],
    enabled: !Object.keys(filters).some(key => 
      filters[key as keyof SearchFilters] && 
      filters[key as keyof SearchFilters] !== 'all' &&
      filters[key as keyof SearchFilters] !== ''
    ),
  });

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      perspective: 'all',
      learningStatus: 'all',
      journeyStage: 'all',
    });
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof SearchFilters] && 
    filters[key as keyof SearchFilters] !== 'all' &&
    filters[key as keyof SearchFilters] !== ''
  );

  const images = hasActiveFilters 
    ? searchResult.searchResults 
    : (allImagesQuery.data as any)?.images || [];

  const isLoading = hasActiveFilters 
    ? searchResult.isSearching 
    : allImagesQuery.isLoading;

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    images,
    isLoading,
    isSearching: searchResult.isSearching,
    searchCount: hasActiveFilters ? searchResult.searchResults.length : images.length,
  };
}