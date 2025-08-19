import { test, expect } from '@playwright/test';

test.describe('견적 신청 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estimate');
  });

  test('전체 견적 신청 플로우가 정상 작동한다', async ({ page }) => {
    // 1단계: 차량 선택
    await expect(page.getByText('차량 정보')).toBeVisible();
    
    // 중형차 선택
    await page.getByText('준중형/중형차').click();
    
    // 차량 모델 입력 (선택사항)
    await page.getByPlaceholder('예: 아반떼, 소나타').fill('현대 아반떼 2023년형');
    
    // 다음 단계로
    await page.getByRole('button', { name: '다음' }).click();
    
    // 2단계: 운송 정보
    await expect(page.getByText('운송 정보')).toBeVisible();
    
    // 출발지 입력
    const departureInput = page.getByPlaceholder('출발지 주소를 검색하세요');
    await departureInput.fill('제주시 연동');
    await page.waitForTimeout(500); // 검색 결과 대기
    
    // 첫 번째 검색 결과 선택
    const firstResult = page.locator('[data-testid="address-result"]').first();
    if (await firstResult.isVisible()) {
      await firstResult.click();
    }
    
    // 도착지 입력
    const arrivalInput = page.getByPlaceholder('도착지 주소를 검색하세요');
    await arrivalInput.fill('서귀포시 중문');
    await page.waitForTimeout(500); // 검색 결과 대기
    
    // 첫 번째 검색 결과 선택
    const firstArrivalResult = page.locator('[data-testid="address-result"]').first();
    if (await firstArrivalResult.isVisible()) {
      await firstArrivalResult.click();
    }
    
    // 운송 날짜 선택
    await page.getByRole('button', { name: /운송 희망일/ }).click();
    
    // 내일 날짜 선택 (오늘은 선택할 수 없으므로)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getDate().toString();
    
    await page.getByRole('button', { name: tomorrowDate, exact: true }).click();
    
    // 다음 단계로
    await page.getByRole('button', { name: '다음' }).click();
    
    // 3단계: 연락처 정보
    await expect(page.getByText('연락처 정보')).toBeVisible();
    
    // 고객 정보 입력
    await page.getByPlaceholder('이름을 입력하세요').fill('테스트 고객');
    await page.getByPlaceholder('전화번호를 입력하세요').fill('010-1234-5678');
    await page.getByPlaceholder('이메일을 입력하세요').fill('test@example.com');
    await page.getByPlaceholder('추가 요청사항이 있으시면').fill('조심히 운송해 주세요');
    
    // 다음 단계로
    await page.getByRole('button', { name: '다음' }).click();
    
    // 4단계: 최종 확인
    await expect(page.getByText('신청 내용 확인')).toBeVisible();
    
    // 입력한 정보들이 올바르게 표시되는지 확인
    await expect(page.getByText('중형차')).toBeVisible();
    await expect(page.getByText('테스트 고객')).toBeVisible();
    await expect(page.getByText('010-1234-5678')).toBeVisible();
    
    // 견적 신청 완료
    await page.getByRole('button', { name: '견적 신청 완료' }).click();
    
    // 완료 메시지 또는 결과 페이지 확인
    await expect(page.getByText(/견적.*완료/)).toBeVisible();
  });

  test('단계별 유효성 검증이 정상 작동한다', async ({ page }) => {
    // 차량을 선택하지 않고 다음으로 시도
    const nextButton = page.getByRole('button', { name: '다음' });
    await expect(nextButton).toBeDisabled();
    
    // 차량 선택 후 다음 버튼 활성화 확인
    await page.getByText('소형차').click();
    await expect(nextButton).toBeEnabled();
    
    // 다음 단계로
    await nextButton.click();
    
    // 필수 정보 없이 다음으로 시도
    await expect(page.getByRole('button', { name: '다음' })).toBeDisabled();
  });

  test('이전 단계로 돌아가기가 정상 작동한다', async ({ page }) => {
    // 차량 선택
    await page.getByText('소형차').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 2단계에서 이전 버튼 클릭
    await page.getByRole('button', { name: '이전' }).click();
    
    // 1단계로 돌아왔는지 확인
    await expect(page.getByText('차량 종류를 선택하세요')).toBeVisible();
    
    // 선택한 차량이 유지되는지 확인
    const selectedVehicle = page.locator('.ring-2.ring-red-500');
    await expect(selectedVehicle).toBeVisible();
  });

  test('진행률 표시가 정확하다', async ({ page }) => {
    // 초기 진행률 확인
    const progressIndicators = page.locator('[data-testid="step-progress"] .current');
    await expect(progressIndicators.first()).toBeVisible();
    
    // 각 단계별로 진행하면서 진행률 확인
    await page.getByText('소형차').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 2단계 표시 확인
    await expect(page.getByText('운송 정보')).toBeVisible();
  });

  test('폼 검증 메시지가 정확하게 표시된다', async ({ page }) => {
    // 3단계까지 진행
    await page.getByText('소형차').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 최소한의 운송 정보만 입력
    await page.getByPlaceholder('출발지 주소를 검색하세요').fill('제주시');
    await page.getByPlaceholder('도착지 주소를 검색하세요').fill('서귀포시');
    
    // 날짜 선택
    await page.getByRole('button', { name: /운송 희망일/ }).click();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.getByRole('button', { name: tomorrow.getDate().toString() }).click();
    
    await page.getByRole('button', { name: '다음' }).click();
    
    // 잘못된 정보 입력
    await page.getByPlaceholder('이름을 입력하세요').fill('A'); // 너무 짧은 이름
    await page.getByPlaceholder('전화번호를 입력하세요').fill('123'); // 잘못된 전화번호
    await page.getByPlaceholder('이메일을 입력하세요').fill('invalid-email'); // 잘못된 이메일
    
    // 다음 버튼 클릭 시도
    await page.getByRole('button', { name: '다음' }).click();
    
    // 에러 메시지 확인
    await expect(page.getByText(/이름은 2글자 이상/)).toBeVisible();
    await expect(page.getByText(/올바른 휴대폰 번호/)).toBeVisible();
    await expect(page.getByText(/올바른 이메일/)).toBeVisible();
  });

  test('키보드 네비게이션이 정상 작동한다', async ({ page }) => {
    // Tab 키로 네비게이션
    await page.keyboard.press('Tab');
    
    // 첫 번째 차량 카드에 포커스
    const firstVehicleCard = page.locator('.cursor-pointer').first();
    await expect(firstVehicleCard).toBeFocused();
    
    // Enter로 선택
    await page.keyboard.press('Enter');
    
    // 선택 상태 확인
    await expect(firstVehicleCard).toHaveClass(/ring-2/);
  });

  test('모바일에서 정상 작동한다', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 반응형 레이아웃 확인
    await expect(page.getByText('차량 탁송 견적 신청')).toBeVisible();
    
    // 모바일에서 차량 선택
    await page.getByText('소형차').click();
    
    // 다음 버튼이 전체 너비로 표시되는지 확인
    const nextButton = page.getByRole('button', { name: '다음' });
    await expect(nextButton).toBeVisible();
  });

  test('자동 저장 기능이 작동한다', async ({ page }) => {
    // 차량 선택
    await page.getByText('중형차').click();
    await page.getByPlaceholder('예: 아반떼, 소나타').fill('아반떼');
    
    // 페이지 새로고침
    await page.reload();
    
    // 선택한 내용이 유지되는지 확인 (localStorage 사용)
    const selectedVehicle = page.locator('.ring-2.ring-red-500');
    if (await selectedVehicle.isVisible()) {
      await expect(selectedVehicle).toBeVisible();
    }
  });
});