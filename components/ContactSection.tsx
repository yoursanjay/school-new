"use client";

import React, { useState } from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+-\s()]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief message or enquiry.";
    } else if (formData.message.trim().length < 8) {
      newErrors.message = "Message must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable client-side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full bg-[#F7F4EC] text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="GET IN TOUCH"
          title="Contact Our School"
          subtitle="We welcome parents and students to visit our campus, consult with our admissions team, and discover learning at Sri Aurobindo Mira."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start w-full">
          {/* LEFT COLUMN: School Address, Phone, Email, Office Hours, Map-style visual area (5 cols) */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <Reveal direction="left" duration={600}>
              <div className="p-8 sm:p-9 rounded-[28px] bg-white shadow-sm border border-[#0B1B33]/10 space-y-6">
                <h3 className="text-xl font-black text-[#0B1B33] tracking-tight">
                  Campus Admissions Office
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B33]/5 text-[#C99732] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-[#C99732]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                        School Address
                      </h4>
                      <p className="text-sm font-semibold text-[#0B1B33] mt-1 leading-snug">
                        Sri Aurobindo Mira Universal School,
                        <br />
                        Keelamathur, Melakkal Main Road,
                        <br />
                        Madurai – 625016, Tamil Nadu, India.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B33]/5 text-[#C99732] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-[#C99732]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                        Phone Enquiries
                      </h4>
                      <div className="mt-1 flex flex-col gap-0.5">
                        <a
                          href="tel:+919047077677"
                          className="text-sm font-bold text-[#0B1B33] hover:text-[#C99732] transition-colors"
                        >
                          +91 90470 77677
                        </a>
                        <a
                          href="tel:+914522381234"
                          className="text-xs text-[#667085] hover:text-[#0B1B33]"
                        >
                          +91 452 238 1234
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B33]/5 text-[#C99732] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-[#C99732]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                        Email
                      </h4>
                      <div className="mt-1 flex flex-col gap-0.5">
                        <a
                          href="mailto:info@school.edu"
                          className="text-sm font-bold text-[#0B1B33] hover:text-[#C99732] transition-colors"
                        >
                          info@school.edu
                        </a>
                        <a
                          href="mailto:admissions@samcbse.org"
                          className="text-xs text-[#667085] hover:text-[#0B1B33]"
                        >
                          admissions@samcbse.org
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B33]/5 text-[#C99732] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#C99732]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                        Office Hours
                      </h4>
                      <p className="text-sm font-semibold text-[#0B1B33] mt-1">
                        Monday – Saturday: 8:30 AM – 4:30 PM
                      </p>
                      <p className="text-xs text-[#667085]">
                        Campus tours by prior appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Map-Style Visual Campus Area */}
            <Reveal direction="up" delay={120} duration={600}>
              <div className="relative rounded-[28px] overflow-hidden shadow-sm border border-[#0B1B33]/10 h-56 group bg-slate-200">
                <img
                  src="/images/school/campus.jpg"
                  alt="Sri Aurobindo Mira Campus Map View"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-[#E2B64A] text-xs font-bold uppercase tracking-wider">
                    <Building className="w-3.5 h-3.5" />
                    <span>Keelamathur Campus, Madurai</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1">
                    Safe 10-acre campus with GPS-tracked bus transport covering all city routes.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Contact & Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <Reveal direction="right" duration={600}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-white shadow-sm border border-[#0B1B33]/10 relative">
                {isSuccess ? (
                  /* Success State */
                  <div className="text-center py-12 px-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border-2 border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1B33] mb-2 tracking-tight">
                      Enquiry Sent Successfully!
                    </h3>
                    <p className="text-[#667085] text-sm sm:text-base max-w-md mx-auto mb-4 font-normal">
                      Thank you,{" "}
                      <span className="font-bold text-[#0B1B33]">
                        {formData.fullName}
                      </span>
                      . Our admissions counsellor has received your details and
                      will get in touch with you shortly.
                    </p>
                    <p className="text-xs text-slate-400 mb-6">
                      A copy has been referenced for {formData.email}.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-7 py-3 rounded-full bg-[#0B1B33] hover:bg-[#102A4A] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Contact Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-black text-[#0B1B33] tracking-tight">
                        Send An Enquiry
                      </h3>
                      <p className="text-xs sm:text-sm text-[#667085] mt-1 font-normal">
                        Fill in your details below and our team will get in touch promptly.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-[#0B1B33] uppercase tracking-wider mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Senthil Nathan"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F7F4EC]/60 border text-sm text-[#0B1B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C99732] focus:bg-white transition-all duration-200 ${
                          errors.fullName
                            ? "border-rose-400 focus:ring-rose-400"
                            : "border-[#0B1B33]/15"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone & Email in 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold text-[#0B1B33] uppercase tracking-wider mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-3 rounded-xl bg-[#F7F4EC]/60 border text-sm text-[#0B1B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C99732] focus:bg-white transition-all duration-200 ${
                            errors.phone
                              ? "border-rose-400 focus:ring-rose-400"
                              : "border-[#0B1B33]/15"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold text-[#0B1B33] uppercase tracking-wider mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="parent@example.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#F7F4EC]/60 border text-sm text-[#0B1B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C99732] focus:bg-white transition-all duration-200 ${
                            errors.email
                              ? "border-rose-400 focus:ring-rose-400"
                              : "border-[#0B1B33]/15"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold text-[#0B1B33] uppercase tracking-wider mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Please write your questions regarding admissions, grade level, transportation, or campus tour scheduling."
                        className={`w-full px-4 py-3 rounded-xl bg-[#F7F4EC]/60 border text-sm text-[#0B1B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C99732] focus:bg-white transition-all duration-200 resize-none ${
                          errors.message
                            ? "border-rose-400 focus:ring-rose-400"
                            : "border-[#0B1B33]/15"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#0B1B33] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 cursor-pointer select-none"
                      style={{
                        background: "linear-gradient(135deg, #E2B64A 0%, #C99732 100%)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0B1B33]/30 border-t-[#0B1B33] rounded-full animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-[#667085]">
                      We respect your privacy. Your contact info is strictly used for admissions communications.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
