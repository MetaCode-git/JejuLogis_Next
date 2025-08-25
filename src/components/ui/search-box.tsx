'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/lib/theme';

interface SearchResult {
  id: string;
  address: string;
  roadAddress?: string;
  zipcode?: string;
  x?: string; // 경도
  y?: string; // 위도
}

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  onSearch?: (query: string) => Promise<SearchResult[]>;
  results?: SearchResult[];
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  showIcon?: boolean;
  allowClear?: boolean;
  maxResults?: number;
}

export function SearchBox({
  placeholder = '주소를 검색하세요',
  value = '',
  onChange,
  onSelect,
  onSearch,
  results = [],
  loading = false,
  disabled = false,
  className,
  showIcon = true,
  allowClear = true,
  maxResults = 10,
}: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(results);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색 실행
  const performSearch = async (query: string) => {
    if (!query.trim() || !onSearch) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await onSearch(query);
      setSearchResults(results.slice(0, maxResults));
      setIsOpen(results.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 디바운스된 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        performSearch(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    
    if (!newValue.trim()) {
      setSearchResults([]);
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setIsOpen(true);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    setInputValue(result.address);
    setIsOpen(false);
    onChange?.(result.address);
    onSelect?.(result);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
    setIsOpen(false);
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        {showIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            showIcon && 'pl-10',
            allowClear && inputValue && 'pr-10'
          )}
        />
        
        {allowClear && inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            onClick={handleClear}
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        
        {(isSearching || loading) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {searchResults.map((result) => (
            <button
              key={result.id}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              onClick={() => handleResultSelect(result)}
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {result.roadAddress || result.address}
                  </p>
                  {result.roadAddress && result.address !== result.roadAddress && (
                    <p className="text-xs text-gray-500 truncate">
                      {result.address}
                    </p>
                  )}
                  {result.zipcode && (
                    <p className="text-xs text-gray-400">
                      우편번호: {result.zipcode}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* 검색 결과 없음 */}
      {isOpen && inputValue.trim() && searchResults.length === 0 && !isSearching && !loading && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            검색 결과가 없습니다
          </div>
        </div>
      )}
    </div>
  );
}