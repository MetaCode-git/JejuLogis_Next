import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {children}
    </a>
  );
}

export function SkipNavigation() {
  return (
    <>
      <SkipLink href="#main-content">본문으로 바로가기</SkipLink>
      <SkipLink href="#navigation">네비게이션으로 바로가기</SkipLink>
      <SkipLink href="#footer">푸터로 바로가기</SkipLink>
    </>
  );
}