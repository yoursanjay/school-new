"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    label: "Parent",
    quote:
      "More than a place to learn, the school has given our child the confidence to explore, ask questions, and discover who they are.",
    author: "Parent of Grade 8 Student",
  },
  {
    label: "Student",
    quote:
      "Every day brings something new to discover. I feel encouraged to ask questions, try new things, and grow in confidence.",
    author: "Student",
  },
  {
    label: "Alumni",
    quote:
      "The curiosity, care, and sense of community I found here continue to shape how I learn and contribute today.",
    author: "Alumni",
  },
];

export default function SchoolTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="community" className="school-testimonials">
      <div className="school-section-shell">
        <header className="school-testimonials-header">
          <p className="school-eyebrow school-eyebrow-light">OUR COMMUNITY</p>
          <h2 className="school-serif school-section-title">
            Growing together
          </h2>
          <p>
            Hear from the students, parents, and families who are part of our
            school community.
          </p>
        </header>

        <div className="school-testimonial-feature">
          <div className="school-testimonial-quote">
            <span className="school-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote className="school-serif">
              {activeTestimonial.quote}
            </blockquote>
            <div className="school-testimonial-author">
              <span>{activeTestimonial.author}</span>
              <span>SAM Universal School</span>
            </div>
            <div
              className="school-testimonial-tabs school-mono"
              role="tablist"
              aria-label="Choose a community perspective"
            >
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.label}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls="school-testimonial-panel"
                  onClick={() => setActiveIndex(index)}
                >
                  <span>0{index + 1}</span>
                  {testimonial.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id="school-testimonial-panel"
            className="school-testimonial-image"
            role="tabpanel"
          >
            <Image
              src="/images/school/campus.jpg"
              alt="Students exploring the school campus together"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span className="school-testimonial-image-caption school-mono">
              A community built to help every student grow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
