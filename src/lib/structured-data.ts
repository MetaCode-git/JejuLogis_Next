// 구조화된 데이터 생성 유틸리티

export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  businessNumber: string;
  ownerName: string;
  businessHours: string;
}

// 기업 정보 구조화 데이터
export function generateOrganizationSchema(companyInfo: CompanyInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    alternateName: "제주탁송",
    description: "제주도 차량 탁송, 대리운전, 위탁 서비스 전문업체",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com"}/icon-512x512.png`,
    sameAs: [
      // 소셜 미디어 링크들 (실제 링크로 교체)
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: "Korean"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "제주특별자치도",
      streetAddress: companyInfo.address
    },
    openingHours: "Mo-Su 00:00-23:59", // 24시간 운영
    priceRange: "₩₩",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1"
    }
  };
}

// 서비스 정보 구조화 데이터
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vehicle Transportation Service",
    name: "차량 탁송 서비스",
    description: "제주도 내외 안전한 차량 운송 서비스",
    provider: {
      "@type": "Organization",
      name: "제주탁송"
    },
    areaServed: {
      "@type": "Place",
      name: "제주특별자치도"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Transportation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "차량 탁송",
            description: "제주도 내외 차량 운송"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service", 
            name: "대리운전",
            description: "24시간 대리운전 서비스"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "차량 위탁",
            description: "장단기 차량 보관 서비스"
          }
        }
      ]
    }
  };
}

// 지역 비즈니스 구조화 데이터
export function generateLocalBusinessSchema(companyInfo: CompanyInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com"}/icon-512x512.png`,
    "@id": process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com",
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: "제주시",
      addressRegion: "제주특별자치도",
      addressCountry: "KR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.4996,
      longitude: 126.5312
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    },
    sameAs: [
      // 소셜 미디어 및 기타 플랫폼 링크
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150"
    }
  };
}

// FAQ 페이지 구조화 데이터
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// 빵부스러기 네비게이션 구조화 데이터
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// 웹사이트 구조화 데이터
export function generateWebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejulogis.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "제주탁송",
    alternateName: "제주도 차량 탁송 서비스",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}