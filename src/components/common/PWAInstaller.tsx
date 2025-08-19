'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  platforms: Array<string>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // iOS 감지
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // PWA로 실행 중인지 확인
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                            (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // PWA 설치 가능한지 확인
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // 이미 설치했다면 배너 표시하지 않음
      if (!isStandaloneMode && !localStorage.getItem('pwa-install-dismissed')) {
        setShowInstallBanner(true);
      }
    };

    // PWA가 성공적으로 설치됨
    const handleAppInstalled = () => {
      console.log('PWA가 성공적으로 설치되었습니다');
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      toast.success('앱이 성공적으로 설치되었습니다!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // iOS의 경우 수동 안내
      if (isIOS) {
        toast.info('Safari 브라우저에서 공유 버튼을 눌러 홈 화면에 추가할 수 있습니다.');
        return;
      }
      
      toast.info('이 브라우저에서는 앱 설치를 지원하지 않습니다.');
      return;
    }

    try {
      // 설치 프롬프트 표시
      await deferredPrompt.prompt();
      
      // 사용자 응답 대기
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('사용자가 PWA 설치를 수락했습니다');
        toast.success('앱을 설치하고 있습니다...');
      } else {
        console.log('사용자가 PWA 설치를 거부했습니다');
        toast.info('언제든지 다시 설치할 수 있습니다.');
      }
      
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } catch (error) {
      console.error('PWA 설치 중 오류:', error);
      toast.error('앱 설치 중 오류가 발생했습니다.');
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    toast.info('나중에 언제든 설치할 수 있습니다.');
  };

  // 이미 PWA로 실행 중이면 표시하지 않음
  if (isStandalone) {
    return null;
  }

  // iOS Safari에서 설치 안내
  if (isIOS && showInstallBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-sm">앱으로 설치</CardTitle>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-xs mb-3">
              홈 화면에 추가하여 앱처럼 사용하세요
            </CardDescription>
            <div className="text-xs text-blue-700 space-y-1">
              <p>1. Safari에서 공유 버튼 터치</p>
              <p>2. "홈 화면에 추가" 선택</p>
              <p>3. "추가" 버튼 터치</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Android/Desktop Chrome에서 설치 배너
  if (showInstallBanner && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-green-600" />
                <CardTitle className="text-sm">앱 설치</CardTitle>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-xs mb-3">
              제주탁송을 앱으로 설치하여 더 빠르게 이용하세요
            </CardDescription>
            <div className="flex space-x-2">
              <EnhancedButton
                size="sm"
                onClick={handleInstallClick}
                className="flex-1 text-xs"
                icon={Download}
              >
                설치하기
              </EnhancedButton>
              <EnhancedButton
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="text-xs"
              >
                나중에
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

// PWA 상태 확인 훅
export function usePWAStatus() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkPWAStatus = () => {
      // PWA로 실행 중인지 확인
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);

      // iOS 확인
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(ios);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setIsStandalone(true);
    };

    checkPWAStatus();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return { isInstallable, isStandalone, isIOS };
}