import { create } from 'zustand';

// 알림/토스트 타입
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

// 모달 타입
export interface ModalConfig {
  id: string;
  title: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  actions?: Array<{
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary';
    onClick: () => void;
  }>;
}

// 로딩 상태 타입
export interface LoadingState {
  id: string;
  message?: string;
  progress?: number;
}

export interface UIState {
  // 모바일 메뉴 상태
  isMobileMenuOpen: boolean;
  
  // 로딩 상태들
  loadingStates: LoadingState[];
  
  // 모달 상태들
  modals: ModalConfig[];
  
  // 검색 상태
  searchQuery: string;
  searchHistory: string[];
  
  // 테마 설정
  theme: 'light' | 'dark' | 'system';
  
  // 접근성 설정
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  
  // 액션들
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  
  // 로딩 관리
  addLoading: (loading: LoadingState) => void;
  removeLoading: (id: string) => void;
  updateLoading: (id: string, updates: Partial<LoadingState>) => void;
  clearAllLoading: () => void;
  
  // 모달 관리
  openModal: (modal: ModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  
  // 검색 관리
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // 테마 관리
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // 접근성 설정
  setReducedMotion: (reduced: boolean) => void;
  setHighContrast: (high: boolean) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  
  // 유틸리티
  isLoading: (id?: string) => boolean;
  hasModal: (id: string) => boolean;
}

export const useUIStore = create<UIState>((set, get) => ({
  // 초기 상태
  isMobileMenuOpen: false,
  loadingStates: [],
  modals: [],
  searchQuery: '',
  searchHistory: [],
  theme: 'system',
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  
  // 모바일 메뉴 액션들
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  // 로딩 관리 액션들
  addLoading: (loading) => set((state) => ({
    loadingStates: [...state.loadingStates, loading]
  })),
  
  removeLoading: (id) => set((state) => ({
    loadingStates: state.loadingStates.filter(loading => loading.id !== id)
  })),
  
  updateLoading: (id, updates) => set((state) => ({
    loadingStates: state.loadingStates.map(loading => 
      loading.id === id ? { ...loading, ...updates } : loading
    )
  })),
  
  clearAllLoading: () => set({ loadingStates: [] }),
  
  // 모달 관리 액션들
  openModal: (modal) => set((state) => ({
    modals: [...state.modals, modal]
  })),
  
  closeModal: (id) => set((state) => ({
    modals: state.modals.filter(modal => modal.id !== id)
  })),
  
  closeAllModals: () => set({ modals: [] }),
  
  // 검색 관리 액션들
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addToSearchHistory: (query) => set((state) => {
    if (!query.trim() || state.searchHistory.includes(query)) return state;
    const newHistory = [query, ...state.searchHistory.slice(0, 9)]; // 최대 10개 유지
    return { searchHistory: newHistory };
  }),
  
  clearSearchHistory: () => set({ searchHistory: [] }),
  
  // 테마 관리 액션들
  setTheme: (theme) => set({ theme }),
  
  // 접근성 설정 액션들
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setHighContrast: (high) => set({ highContrast: high }),
  setFontSize: (size) => set({ fontSize: size }),
  
  // 유틸리티 함수들
  isLoading: (id) => {
    const state = get();
    return id ? state.loadingStates.some(loading => loading.id === id) : state.loadingStates.length > 0;
  },
  
  hasModal: (id) => {
    const state = get();
    return state.modals.some(modal => modal.id === id);
  },
}));