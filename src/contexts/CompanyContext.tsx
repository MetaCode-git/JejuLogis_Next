'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CompanyConfig } from '@/types/company';
import { loadCompanyConfig } from '@/lib/config-loader';

interface CompanyContextType {
  config: CompanyConfig | null;
  loading: boolean;
  error: string | null;
  updateConfig: (companyId: string) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CompanyConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = async (companyId: string) => {
    try {
      setLoading(true);
      setError(null);
      const newConfig = await loadCompanyConfig(companyId);
      setConfig(newConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 기본값으로 jejutaksong 설정 로드
    updateConfig(process.env.NEXT_PUBLIC_COMPANY_ID || 'jejutaksong');
  }, []);

  return (
    <CompanyContext.Provider value={{ config, loading, error, updateConfig }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}