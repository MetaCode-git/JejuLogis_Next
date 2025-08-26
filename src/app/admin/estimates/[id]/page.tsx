// SSR 모드에서는 generateStaticParams가 필요하지 않음
// 모든 경로가 동적으로 처리됨
// export async function generateStaticParams() {
//   // SSR 모드에서는 런타임에 동적으로 처리하므로 불필요
//   return [];
// }

import EstimateDetailClient from './EstimateDetailClient';

interface EstimateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EstimateDetailPage({ params }: EstimateDetailPageProps) {
  const resolvedParams = await params;
  return <EstimateDetailClient params={resolvedParams} />;
}