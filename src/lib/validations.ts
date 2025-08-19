import { z } from 'zod';

// 한국 전화번호 정규식
const KOREAN_PHONE_REGEX = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

// 이메일 정규식 (더 엄격한 검증)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 차량 정보 스키마
export const vehicleInfoSchema = z.object({
  category: z.string().min(1, '차량 카테고리를 선택해주세요'),
  customModel: z.string().optional(),
});

// 운송 정보 스키마
export const transportInfoSchema = z.object({
  departureAddress: z
    .string()
    .min(5, '출발지 주소를 정확히 입력해주세요')
    .max(200, '주소가 너무 깁니다'),
  arrivalAddress: z
    .string()
    .min(5, '도착지 주소를 정확히 입력해주세요')
    .max(200, '주소가 너무 깁니다'),
  transportDate: z
    .date({
      required_error: '운송 희망일을 선택해주세요',
      invalid_type_error: '올바른 날짜를 선택해주세요',
    })
    .min(new Date(), '운송일은 오늘 이후로 선택해주세요'),
});

// 고객 정보 스키마
export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 2글자 이상 입력해주세요')
    .max(20, '이름이 너무 깁니다')
    .regex(/^[가-힣a-zA-Z\s]+$/, '이름은 한글 또는 영문만 가능합니다'),
  phone: z
    .string()
    .regex(KOREAN_PHONE_REGEX, '올바른 휴대폰 번호를 입력해주세요')
    .transform((val) => val.replace(/-/g, '')), // 하이픈 제거
  email: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => val === '' ? undefined : val)
    .pipe(
      z
        .string()
        .regex(EMAIL_REGEX, '올바른 이메일 주소를 입력해주세요')
        .optional()
    ),
  specialRequests: z
    .string()
    .max(500, '특별 요청사항은 500자 이내로 입력해주세요')
    .optional(),
});

// 전체 견적 스키마 (모든 단계 통합)
export const estimateSchema = z.object({
  vehicle: vehicleInfoSchema,
  transport: transportInfoSchema,
  customer: customerInfoSchema,
});

// 견적 제출용 스키마 (서버 전송용)
export const submitEstimateSchema = z.object({
  vehicleCategory: z.string().min(1),
  vehicleModel: z.string().optional(),
  departureAddress: z.string().min(1),
  arrivalAddress: z.string().min(1),
  transportDate: z.string().datetime(),
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().optional(),
  specialRequests: z.string().optional(),
});

// 고객 문의 스키마
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 2글자 이상 입력해주세요')
    .max(20, '이름이 너무 깁니다'),
  phone: z
    .string()
    .regex(KOREAN_PHONE_REGEX, '올바른 휴대폰 번호를 입력해주세요'),
  email: z
    .string()
    .regex(EMAIL_REGEX, '올바른 이메일 주소를 입력해주세요')
    .optional(),
  subject: z
    .string()
    .min(2, '제목은 2글자 이상 입력해주세요')
    .max(100, '제목이 너무 깁니다'),
  message: z
    .string()
    .min(10, '문의 내용은 10글자 이상 입력해주세요')
    .max(1000, '문의 내용은 1000자 이내로 입력해주세요'),
});

// 주소 검색 스키마
export const addressSearchSchema = z.object({
  query: z
    .string()
    .min(2, '검색어는 2글자 이상 입력해주세요')
    .max(100, '검색어가 너무 깁니다'),
});

// 타입 추론
export type VehicleInfo = z.infer<typeof vehicleInfoSchema>;
export type TransportInfo = z.infer<typeof transportInfoSchema>;
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type EstimateForm = z.infer<typeof estimateSchema>;
export type SubmitEstimateData = z.infer<typeof submitEstimateSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
export type AddressSearchQuery = z.infer<typeof addressSearchSchema>;

// 검증 헬퍼 함수들
export function validatePhoneNumber(phone: string): boolean {
  return KOREAN_PHONE_REGEX.test(phone);
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}