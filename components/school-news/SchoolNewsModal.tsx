"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Tag } from "lucide-react";
import type { NewsArticle, CampusMomentPhoto } from "./schoolNewsData";
import styles from "./SchoolNewsPage.module.css";

interface SchoolNewsModalProps {
  article: NewsArticle | null;
  moment: CampusMomentPhoto | null;
  onClose: () => void;
}

export default function SchoolNewsModal({ article, moment, onClose }: SchoolNewsModalProps) {
  const isOpen = Boolean(article || moment);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#041744]/82 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={article ? article.headline : moment?.caption}
      onClick={onClose}
    >
      <div
        className={`${styles.parchmentSheet} relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111521] text-[#FFD52A] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {article && (
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-4 pr-12">
              <span className={`${styles.redStamp} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded`}>
                <Tag className="w-3.5 h-3.5" />
                {article.category}
              </span>
              <span className={`${styles.yellowPanel} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded`}>
                <Calendar className="w-3.5 h-3.5" />
                {article.dateLabel}
              </span>
            </div>

            <h2 className={`${styles.displayHeading} text-3xl sm:text-4xl text-[#111521] mb-2`}>
              {article.headline}
            </h2>
            <p className="text-sm font-bold uppercase tracking-wider text-[#E53935] mb-5">
              {article.subhead}
            </p>

            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border-2 border-[#111521] mb-6">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 768px) 92vw, 640px"
                className="object-cover"
              />
            </div>

            <div className="space-y-3.5 text-[#22283a] text-base leading-relaxed font-medium">
              {article.fullStory.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {moment && (
          <div>
            <span className={`${styles.orangeBadge} ${styles.monoTag} inline-block px-3 py-1 text-xs font-bold rounded mb-4`}>
              {moment.tag}
            </span>
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border-2 border-[#111521] mb-4">
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                sizes="(max-width: 768px) 92vw, 640px"
                className="object-cover"
              />
            </div>
            <p className={`${styles.scriptNote} text-2xl sm:text-3xl text-[#111521]`}>
              {moment.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
