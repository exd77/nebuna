"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <AnimatedSection className="mb-12 text-center">
        <p className="mb-2 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          FAQ
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Pertanyaan <span className="gradient-text">Umum</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/55">
          Temukan jawaban untuk pertanyaan yang sering diajukan customer
          Nebuna Store.
        </p>
      </AnimatedSection>

      <div className="space-y-3">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <AnimatedSection key={item.question} delay={i * 0.05}>
              <div
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-all ${
                  isOpen
                    ? "border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.05] to-blue-500/[0.02]"
                    : "border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:border-white/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isOpen
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-white/5 text-white/50"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-white/5 px-5 pt-4 pb-5 text-sm leading-relaxed text-white/65">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Contact CTA */}
      <AnimatedSection delay={0.3} className="mt-10">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Masih butuh bantuan?
              </div>
              <div className="text-xs text-white/55">
                Tim support kami siap membantu 24/7.
              </div>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Hubungi Support
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
