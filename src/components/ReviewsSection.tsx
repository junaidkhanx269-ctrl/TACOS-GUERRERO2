import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Counter animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const target = 381;
          const duration = 1800; // ms
          const stepTime = 15;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="reviews" ref={sectionRef} className="py-16 bg-[#181818] border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Animated Counter */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Trust Banner with Google Logo */}
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4 shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>As seen on - Google Maps Top Rated</span>
          </div>

          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            WHAT EAST AUSTIN <span className="text-[#FFEB3B]">IS SAYING</span>
          </h2>

          {/* Animated Counter for Social Proof */}
          <div className="mt-4 p-4 rounded-2xl bg-[#222222] border-2 border-[#FFEB3B]/40 inline-flex flex-col sm:flex-row items-center justify-center gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="font-anton text-4xl sm:text-5xl text-[#FFEB3B] tracking-tight">
                {count}+
              </span>
              <div className="text-left">
                <div className="font-anton text-base text-white uppercase leading-none">
                  Happy Customers
                </div>
                <div className="text-xs text-neutral-400 font-semibold mt-0.5">
                  Rated us <span className="text-[#FFEB3B] font-bold">4.8 Stars</span> on Google
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-neutral-700 mx-2" />

            <div className="flex items-center gap-1 text-[#FFEB3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFEB3B] text-[#FFEB3B]" />
              ))}
              <span className="ml-1 text-white font-black text-sm">4.8 / 5.0</span>
            </div>
          </div>
        </div>

        {/* 3 Real Style Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#212121] rounded-2xl p-6 border border-neutral-800 hover:border-[#FFEB3B]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#FFEB3B]"
                    />
                    <div>
                      <h3 className="font-anton text-lg text-white uppercase tracking-wide">
                        {review.author}
                      </h3>
                      <div className="text-[11px] text-neutral-400 font-medium">
                        {review.role}
                      </div>
                    </div>
                  </div>

                  {/* Google Logo badge */}
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stars & Verified Google Review Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-[#FFEB3B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFEB3B] text-[#FFEB3B]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    <CheckCircle className="w-3 h-3" />
                    Verified Google Review
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-sm text-neutral-200 leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
              </div>

              {/* Footer with date & likes */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>{review.date}</span>
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{review.likes} helpful</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-10 text-center">
          <a
            href="https://maps.google.com/?q=96+N+Pleasant+Valley+Rd,+Austin,+TX+78702"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#FFEB3B] transition-colors border-b border-neutral-700 hover:border-[#FFEB3B] pb-1"
          >
            <span>Read all 381 reviews directly on Google Maps</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};
