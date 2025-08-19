# 멀티 스테이지 빌드로 최적화된 Docker 이미지 생성

# === Base stage ===
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpm 설치 (더 빠른 패키지 매니저)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# === Dependencies stage ===
FROM base AS deps
# package.json과 package-lock.json 복사
COPY package.json package-lock.json* ./

# 의존성 설치 (프로덕션용)
RUN npm ci --only=production && npm cache clean --force

# === Development dependencies stage ===
FROM base AS dev-deps
COPY package.json package-lock.json* ./

# 모든 의존성 설치 (개발용 포함)
RUN npm ci

# === Builder stage ===
FROM base AS builder
WORKDIR /app

# 개발 의존성 복사
COPY --from=dev-deps /app/node_modules ./node_modules

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js 빌드
RUN npm run build

# === Production stage ===
FROM base AS runner
WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 시스템 사용자 생성 (보안)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 공용 파일들 복사
COPY --from=builder /app/public ./public

# Next.js 빌드 결과물 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 프로덕션 의존성 복사
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# 폰트 파일 복사 (로컬 폰트 사용 시)
COPY --from=builder --chown=nextjs:nodejs /app/public/assets ./public/assets

# 권한 설정
RUN chown -R nextjs:nodejs /app
USER nextjs

# 포트 노출
EXPOSE 3000

# 환경 변수
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# 앱 실행
CMD ["node", "server.js"]