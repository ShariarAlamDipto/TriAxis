'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface FeaturedPaper {
  id: string;
  title: string;
  coverImage?: string;
  subject: string;
  year: number;
  examType: string;
  price: number;
}

const mockPapers: FeaturedPaper[] = [
  {
    id: '1',
    title: 'Mathematics O-Level 2024 May/June',
    subject: 'Mathematics',
    year: 2024,
    examType: 'O-Level',
    price: 50,
    coverImage: undefined
  },
  {
    id: '2',
    title: 'Physics A-Level 2024 May/June',
    subject: 'Physics',
    year: 2024,
    examType: 'A-Level',
    price: 80,
    coverImage: undefined
  },
  {
    id: '3',
    title: 'Chemistry O-Level 2024 May/June',
    subject: 'Chemistry',
    year: 2024,
    examType: 'O-Level',
    price: 50,
    coverImage: undefined
  },
  {
    id: '4',
    title: 'Biology A-Level 2024 May/June',
    subject: 'Biology',
    year: 2024,
    examType: 'A-Level',
    price: 80,
    coverImage: undefined
  },
  {
    id: '5',
    title: 'English O-Level 2024 May/June',
    subject: 'English',
    year: 2024,
    examType: 'O-Level',
    price: 50,
    coverImage: undefined
  },
  {
    id: '6',
    title: 'Economics A-Level 2024 May/June',
    subject: 'Economics',
    year: 2024,
    examType: 'A-Level',
    price: 80,
    coverImage: undefined
  },
];

export default function FeaturedPapers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className={`text-5xl font-extrabold text-navy mb-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Latest Question Papers
          </h2>
          <p className={`text-xl text-text-gray ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Recently added papers from the latest examination sessions
          </p>
        </div>

        {/* Papers Grid with Staggered Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockPapers.map((paper, index) => (
            <div
              key={paper.id}
              className={`group bg-soft-gray rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-teal ${
                isVisible ? `animate-scale-in animation-delay-${(index % 4) * 100 + 100}` : 'opacity-0'
              }`}
            >
              {/* Cover Image */}
              <Link href={`/papers/${paper.id}`}>
                <div className="aspect-[3/4] bg-gradient-to-br from-navy/5 to-teal/10 relative overflow-hidden">
                  {paper.coverImage ? (
                    <Image
                      src={paper.coverImage}
                      alt={paper.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-24 w-24 text-teal/40 group-hover:text-orange/60 transition-colors" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-yellow text-navy px-3 py-1 rounded-full text-xs font-extrabold shadow-lg">
                    {paper.year}
                  </div>
                </div>
              </Link>

              {/* Paper Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold text-teal uppercase tracking-wider">
                    {paper.examType}
                  </span>
                  <span className="text-xs text-text-gray">•</span>
                  <span className="text-xs font-bold text-text-gray">
                    {paper.subject}
                  </span>
                </div>
                <Link href={`/papers/${paper.id}`}>
                  <h3 className="font-bold text-navy mb-3 line-clamp-2 group-hover:text-orange transition-colors text-lg">
                    {paper.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-extrabold text-orange">
                    ৳{paper.price}
                  </p>
                  <Link
                    href={`/papers/${paper.id}`}
                    className="text-teal hover:text-orange transition-colors font-bold text-sm flex items-center gap-1"
                  >
                    View <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <Link href="/browse" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Browse All Papers <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
