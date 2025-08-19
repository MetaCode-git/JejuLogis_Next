import { test, expect } from '@playwright/test';

test.describe('홈페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/제주탁송/);
    
    // 메인 헤딩 확인
    const mainHeading = page.getByRole('heading', { name: /제주탁송/ });
    await expect(mainHeading).toBeVisible();
    
    // 네비게이션 메뉴 확인
    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeVisible();
    
    // 푸터 확인
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  });

  test('네비게이션 메뉴가 정상 작동한다', async ({ page }) => {
    // 견적신청 링크 클릭
    await page.getByRole('link', { name: '견적신청' }).click();
    await expect(page).toHaveURL('/estimate');
    
    // 뒤로 가기
    await page.goBack();
    
    // 회사소개 링크 클릭
    await page.getByRole('link', { name: '회사소개' }).click();
    await expect(page).toHaveURL('/company');
  });

  test('서비스 카드들이 표시된다', async ({ page }) => {
    // 서비스 카드들 확인
    await expect(page.getByText('차량 탁송')).toBeVisible();
    await expect(page.getByText('대리운전')).toBeVisible();
    await expect(page.getByText('차량 위탁')).toBeVisible();
    await expect(page.getByText('보험 안내')).toBeVisible();
    
    // 서비스 카드 클릭 테스트
    await page.getByText('차량 탁송').click();
    await expect(page).toHaveURL('/estimate');
  });

  test('연락처 정보가 표시된다', async ({ page }) => {
    // 전화번호 확인
    const phoneNumber = page.getByText(/064-123-4567/);
    await expect(phoneNumber).toBeVisible();
    
    // 전화걸기 링크 테스트
    const phoneLink = page.getByRole('link', { name: /064-123-4567/ });
    await expect(phoneLink).toHaveAttribute('href', 'tel:064-123-4567');
  });

  test('모바일 반응형이 정상 작동한다', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 햄버거 메뉴 확인
    const mobileMenu = page.getByRole('button', { name: /메뉴/ });
    await expect(mobileMenu).toBeVisible();
    
    // 모바일 메뉴 클릭
    await mobileMenu.click();
    
    // 모바일 메뉴 항목들 확인
    await expect(page.getByRole('link', { name: '견적신청' })).toBeVisible();
    await expect(page.getByRole('link', { name: '회사소개' })).toBeVisible();
  });

  test('캐러셀이 정상 작동한다', async ({ page }) => {
    // 캐러셀 확인
    const carousel = page.locator('[data-testid="hero-carousel"]');
    if (await carousel.isVisible()) {
      // 다음 버튼 클릭
      const nextButton = carousel.getByRole('button', { name: /다음/ });
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000); // 애니메이션 대기
      }
      
      // 이전 버튼 클릭
      const prevButton = carousel.getByRole('button', { name: /이전/ });
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await page.waitForTimeout(1000); // 애니메이션 대기
      }
    }
  });

  test('접근성이 준수된다', async ({ page }) => {
    // 키보드 네비게이션 테스트
    await page.keyboard.press('Tab');
    
    // 포커스된 요소가 시각적으로 표시되는지 확인
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 스킵 링크 테스트
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('본문으로 바로가기');
    if (await skipLink.isVisible()) {
      await skipLink.click();
    }
  });

  test('빠른 연락 기능이 작동한다', async ({ page }) => {
    // 빠른 전화 버튼 찾기
    const quickCallButton = page.getByRole('button', { name: /바로 전화/ });
    if (await quickCallButton.isVisible()) {
      await quickCallButton.click();
      // 전화 앱이 열리는지는 브라우저 정책에 따라 다름
    }
    
    // 견적 신청 버튼
    const estimateButton = page.getByRole('link', { name: /견적 신청/ });
    await expect(estimateButton).toBeVisible();
    await estimateButton.click();
    await expect(page).toHaveURL(/\/estimate/);
  });

  test('푸터 링크들이 정상 작동한다', async ({ page }) => {
    // 푸터까지 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // 푸터 링크들 확인
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('제주탁송')).toBeVisible();
    await expect(footer.getByText(/064-123-4567/)).toBeVisible();
  });
});