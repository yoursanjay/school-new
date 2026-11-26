'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './WhySamUniverse.module.css';
import HeroSection from './HeroSection';
import LearningSection from './LearningSection';
import StrengthSection from './StrengthSection';
import PlaySection from './PlaySection';
import CreativitySection from './CreativitySection';
import CommunitySection from './CommunitySection';
import JourneySection from './JourneySection';

gsap.registerPlugin(ScrollTrigger);

export default function WhySamUniverse() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          `.${styles.heroIntro} > *`,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
          },
        );

        root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: 'power2.out',
              immediateRender: false,
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: group,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        });

        root.querySelectorAll<HTMLElement>('[data-diagonal]').forEach((frame) => {
          const image = frame.querySelector<HTMLElement>('img');
          if (!image) return;

          gsap.fromTo(
            image,
            { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: image,
                start: 'top 86%',
                end: 'top 38%',
                scrub: 0.55,
              },
            },
          );
        });

        root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: image.closest('section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        });
      });

      media.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const playSection = root.querySelector<HTMLElement>('#play-section');
          const viewport = root.querySelector<HTMLElement>('[data-play-viewport]');
          const track = root.querySelector<HTMLElement>('[data-play-track]');
          if (!playSection || !viewport || !track) return;

          gsap.to(track, {
            x: () => Math.min(0, viewport.clientWidth - track.scrollWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: playSection,
              start: 'top top+=72',
              end: () =>
                `+=${Math.max(720, track.scrollWidth - viewport.clientWidth)}`,
              pin: playSection,
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div id="why-sam-universe" className={styles.page} ref={rootRef}>
      <HeroSection />
      <LearningSection />
      <StrengthSection />
      <PlaySection />
      <CreativitySection />
      <CommunitySection />
      <JourneySection />
    </div>
  );
}
