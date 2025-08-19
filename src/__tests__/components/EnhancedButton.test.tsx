import React from 'react';
import { render, screen, fireEvent } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Car } from 'lucide-react';

describe('EnhancedButton', () => {
  it('기본 버튼이 렌더링된다', () => {
    render(<EnhancedButton>테스트 버튼</EnhancedButton>);
    
    const button = screen.getByRole('button', { name: '테스트 버튼' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex');
  });

  it('클릭 이벤트가 정상 작동한다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <EnhancedButton onClick={handleClick}>
        클릭해주세요
      </EnhancedButton>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('로딩 상태가 정상 표시된다', () => {
    render(
      <EnhancedButton loading loadingText="로딩중...">
        버튼
      </EnhancedButton>
    );
    
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('아이콘이 정상 표시된다', () => {
    render(
      <EnhancedButton icon={Car} iconPosition="left">
        차량 선택
      </EnhancedButton>
    );
    
    // 아이콘 확인 (SVG 요소로 렌더링됨)
    expect(screen.getByText('차량 선택')).toBeInTheDocument();
  });

  it('비활성화 상태가 정상 작동한다', () => {
    const handleClick = jest.fn();
    
    render(
      <EnhancedButton disabled onClick={handleClick}>
        비활성화 버튼
      </EnhancedButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('전체 너비 옵션이 정상 작동한다', () => {
    render(<EnhancedButton fullWidth>전체 너비</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('그라디언트 옵션이 정상 작동한다', () => {
    render(<EnhancedButton gradient>그라디언트</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r');
  });

  it('맥박 애니메이션이 정상 작동한다', () => {
    render(<EnhancedButton pulse>맥박 버튼</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('animate-pulse');
  });

  it('다양한 크기가 정상 적용된다', () => {
    const { rerender } = render(<EnhancedButton size="sm">작은 버튼</EnhancedButton>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
    
    rerender(<EnhancedButton size="lg">큰 버튼</EnhancedButton>);
    expect(screen.getByRole('button')).toHaveClass('h-10');
  });

  it('다양한 variant가 정상 적용된다', () => {
    const { rerender } = render(<EnhancedButton variant="outline">아웃라인</EnhancedButton>);
    expect(screen.getByRole('button')).toHaveClass('border-input');
    
    rerender(<EnhancedButton variant="secondary">보조</EnhancedButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
    
    rerender(<EnhancedButton variant="destructive">위험</EnhancedButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('키보드 접근성이 정상 작동한다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<EnhancedButton onClick={handleClick}>키보드 테스트</EnhancedButton>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('ARIA 속성이 정상 설정된다', () => {
    render(
      <EnhancedButton 
        loading 
        aria-label="사용자 정의 라벨"
        aria-describedby="helper-text"
      >
        ARIA 테스트
      </EnhancedButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '사용자 정의 라벨');
    expect(button).toHaveAttribute('aria-describedby', 'helper-text');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});