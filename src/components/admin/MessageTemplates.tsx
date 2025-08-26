'use client';

import { useCallback } from 'react';
import { AdminEstimate } from '@/types/admin';
import { useClipboard, replaceTemplateVariables, formatTextForClipboard } from '@/hooks/useClipboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  User, 
  Ship, 
  Truck, 
  MapPin,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MessageTemplatesProps {
  estimate: AdminEstimate;
  className?: string;
}

// Company information (from legacy information.json)
const COMPANY_INFO = {
  name: '제주탁송',
  adminPhone: '010-2325-0866',
  reservationName: '제주탁송',
  bankName: '농협은행',
  bankNumber: '301-0302-4304-51',
  bankOwner: '김영호',
};

export function MessageTemplates({ estimate, className }: MessageTemplatesProps) {
  const { copyToClipboard, isSupported } = useClipboard();

  // Format date for display
  const formatTransportDate = (dateString: string) => {
    return format(new Date(dateString), 'yyyy년 MM월 dd일', { locale: ko });
  };

  // Template variables
  const templateVars = {
    contact: estimate.customerPhone,
    carName: estimate.carName,
    carNumber: estimate.carNumber || '미등록',
    carDepTime: formatTransportDate(estimate.transportDate),
    departure: estimate.departure,
    arrival: estimate.arrival,
    customerName: estimate.customerName,
    cost: new Intl.NumberFormat('ko-KR').format(estimate.cost),
    adminPhone: COMPANY_INFO.adminPhone,
    companyName: COMPANY_INFO.name,
    reservationName: COMPANY_INFO.reservationName,
    bankName: COMPANY_INFO.bankName,
    bankNumber: COMPANY_INFO.bankNumber,
    bankOwner: COMPANY_INFO.bankOwner,
  };

  // Template definitions
  const templates = [
    {
      id: 'customer',
      title: '고객용',
      description: '입금확인 및 예약완료 안내',
      icon: <User className="h-4 w-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      template: `안녕하세요 최저가 {companyName}입니다
입금확인 되었고 다음과 같이 예약이 완료 되었습니다.

# 예약정보 #
연락처 : {contact}
차종 : {carName}
차량번호 : {carNumber}
출발일시 : {carDepTime}
출발지 : {departure}
도착지 : {arrival}

* 탁송비용에는 고속도로통행료가 포함되어 있습니다
(혹시라도 차량내 하이패스가 있으시다면 카드는 빼주시기 바랍니다.)
* 주유비는 포함되지 않는 비용으로 출발시 주유는 가득 채워주시길 부탁드립니다.`
    },
    {
      id: 'ship',
      title: '선박용',
      description: '차량 선적 관련 정보 전달',
      icon: <Ship className="h-4 w-4" />,
      color: 'bg-teal-500 hover:bg-teal-600',
      template: `차종 : {carName}
차량번호 : {carNumber}
출발일시 : {carDepTime}
출발지 : 여수엑스포항
도착지 : 제주항
연락처(관리자) : {adminPhone}
예약자명(업체) : {reservationName}

* 예약후 계좌번호와 선적비용 문자 발송 부탁드립니다`
    },
    {
      id: 'dispatch-inland',
      title: '배차 내륙용',
      description: '내륙 운송업체 전달사항',
      icon: <Truck className="h-4 w-4" />,
      color: 'bg-green-500 hover:bg-green-600',
      template: `예약자명(업체) : {reservationName}
연락처(관리자) : {adminPhone}
차종 : {carName}
차량번호 : {carNumber}
출발일시 : {carDepTime}
출발지 : {departure}
도착지 : 전라남도 여수시 덕충동 1998번지 석포물류
출발지 연락처 : {contact}

* 주의사항 확인 부탁드립니다
* 차량선적시 세금계산서 발행해달라고 사무실에 요청부탁드립니다`
    },
    {
      id: 'dispatch-jeju',
      title: '배차 제주용',
      description: '제주 운송업체 전달사항',
      icon: <MapPin className="h-4 w-4" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      template: `예약자명 : {reservationName}
예약자연락처 : {adminPhone}
차종 : {carName}
차량번호 : {carNumber}
출발일시 : {carDepTime}
출발지 : 제주특별자치도 제주시 건입동 제주항 제6부두 동광해운
도착지 : {arrival}
도착지 연락처 : {contact}`
    },
  ];

  const handleCopyTemplate = useCallback(async (template: typeof templates[0]) => {
    const processedText = replaceTemplateVariables(template.template, templateVars);
    const formattedText = formatTextForClipboard(processedText);
    
    await copyToClipboard(
      formattedText,
      `${template.title} 템플릿이 클립보드에 복사되었습니다.`
    );
  }, [templateVars, copyToClipboard]);

  if (!isSupported && typeof window !== 'undefined') {
    return (
      <div className={`${className || ''}`}>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">클립보드 기능을 사용할 수 없습니다</p>
                <p className="text-sm text-yellow-700 mt-1">
                  브라우저가 클립보드 API를 지원하지 않거나 HTTPS 연결이 필요합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {/* Info */}
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <MessageSquare className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">문자 템플릿 사용법</p>
            <ul className="text-xs space-y-1 text-green-700">
              <li>• 템플릿을 클릭하면 해당 내용이 클립보드에 복사됩니다</li>
              <li>• 복사된 텍스트를 문자 앱에 붙여넣기하여 사용하세요</li>
              <li>• 견적 정보가 자동으로 치환되어 복사됩니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Template Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <Button
            key={template.id}
            onClick={() => handleCopyTemplate(template)}
            className={`h-auto py-4 px-4 flex-col space-y-2 text-white ${template.color}`}
          >
            <div className="flex items-center space-x-2">
              {template.icon}
              <Copy className="h-3 w-3" />
              <span className="font-medium">{template.title}</span>
            </div>
            <span className="text-xs opacity-90 text-center leading-tight">
              {template.description}
            </span>
          </Button>
        ))}
      </div>

      {/* Preview Card */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>템플릿 변수 정보</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">고객명:</span>
                <Badge variant="outline" className="text-xs">{templateVars.customerName}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">연락처:</span>
                <Badge variant="outline" className="text-xs">{templateVars.contact}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">차종:</span>
                <Badge variant="outline" className="text-xs">{templateVars.carName}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">차량번호:</span>
                <Badge variant="outline" className="text-xs">{templateVars.carNumber}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">출발일:</span>
                <Badge variant="outline" className="text-xs">{templateVars.carDepTime}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">관리자:</span>
                <Badge variant="outline" className="text-xs">{templateVars.adminPhone}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">업체명:</span>
                <Badge variant="outline" className="text-xs">{templateVars.reservationName}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">탁송비용:</span>
                <Badge variant="outline" className="text-xs">{templateVars.cost}원</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}