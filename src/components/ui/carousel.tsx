'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/theme';
import Image from 'next/image';

interface CarouselSlide {
  id: string;
  image: string;
  title?: string;
  description?: string;
  alt?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide' | 'banner';
  className?: string;
  slideClassName?: string;
}

const aspectRatioClasses = {
  video: 'aspect-video', // 16:9
  square: 'aspect-square', // 1:1
  wide: 'aspect-[21/9]', // 21:9
  banner: 'aspect-[3/1]' // 3:1
};

export function Carousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  aspectRatio = 'banner',
  className,
  slideClassName,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || !emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, emblaApi]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={cn(
                'flex-[0_0_100%] relative',
                aspectRatioClasses[aspectRatio],
                slideClassName
              )}
            >
              <Image
                src={slide.image}
                alt={slide.alt || slide.title || '슬라이드 이미지'}
                fill
                className="object-cover"
                priority={selectedIndex === 0}
              />
              
              {/* 오버레이 텍스트 */}
              {(slide.title || slide.description) && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    {slide.title && (
                      <h3 className="text-2xl md:text-4xl font-bold mb-2 font-jua">
                        {slide.title}
                      </h3>
                    )}
                    {slide.description && (
                      <p className="text-lg md:text-xl opacity-90">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      {showArrows && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'absolute left-4 top-1/2 transform -translate-y-1/2 z-10',
              'bg-white/80 hover:bg-white/90 border-white/50',
              !canScrollPrev && 'opacity-50 cursor-not-allowed'
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              'absolute right-4 top-1/2 transform -translate-y-1/2 z-10',
              'bg-white/80 hover:bg-white/90 border-white/50',
              !canScrollNext && 'opacity-50 cursor-not-allowed'
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* 인디케이터 점들 */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === selectedIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              onClick={() => scrollTo(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}