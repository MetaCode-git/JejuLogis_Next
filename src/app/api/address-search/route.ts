import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: '검색어가 필요합니다' }, { status: 400 });
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_JUSO_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다' }, { status: 500 });
    }

    // JUSO API 호출
    const response = await fetch(
      `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${API_KEY}&currentPage=1&countPerPage=10&keyword=${encodeURIComponent(query)}&resultType=json`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; JejuLogis/1.0)'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results?.common?.errorCode !== '0') {
      console.error('JUSO API 에러:', data.results?.common?.errorMessage);
      return NextResponse.json({ results: [] });
    }

    const jusoList = data.results?.juso || [];
    
    const results = jusoList.map((juso: any) => ({
      address: juso.roadAddr || juso.jibunAddr,
      roadAddress: juso.roadAddr,
      jibunAddress: juso.jibunAddr,
      zonecode: juso.zipNo,
      buildingName: juso.bdNm || ''
    }));

    return NextResponse.json({ results });
    
  } catch (error) {
    console.error('주소 검색 API 에러:', error);
    return NextResponse.json({ error: '주소 검색 중 오류가 발생했습니다' }, { status: 500 });
  }
}