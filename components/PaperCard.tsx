'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { Paper, ExamType, Subject } from '@/types/database';
import AddToCartButton from './AddToCartButton';

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <div className="group bg-panel rounded-none border border-theme hover:border-brand-teal transition-all duration-300 animate-fade-in">
      {/* Cover Image */}
      <Link href={`/papers/${paper.id}`}>
        <div className="aspect-[3/4] bg-theme relative overflow-hidden border-b border-theme">
          {paper.cover_image_url ? (
            <Image
              src={paper.cover_image_url}
              alt={paper.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="h-20 w-20 text-theme-muted opacity-50" />
            </div>
          )}
          {paper.is_premium && (
            <div className="absolute top-3 right-3 bg-brand-gold text-black px-3 py-1 text-xs font-extrabold shadow-lg font-mono uppercase tracking-wider">
              PREMIUM
            </div>
          )}
        </div>
      </Link>

      {/* Paper Info */}
      <div className="p-5">
        <Link href={`/papers/${paper.id}`}>
          <h3 className="font-bold text-theme-primary mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors font-mono uppercase tracking-wide text-sm">
            {paper.title}
          </h3>
        </Link>
        <p className="text-xs text-brand-teal font-bold mb-1 font-mono uppercase tracking-wider">
          {(paper.exam_type as ExamType)?.name} • {paper.year}
        </p>
        <p className="text-xs text-theme-muted mb-3 font-mono uppercase tracking-wider">
          {(paper.subject as Subject)?.name}
        </p>
        
        {paper.is_premium && (
          <div className="flex items-center justify-between">
            <p className="text-lg font-extrabold text-brand-orange font-mono">
              ৳{paper.price}
            </p>
            <AddToCartButton paper={paper} />
          </div>
        )}
      </div>
    </div>
  );
}
