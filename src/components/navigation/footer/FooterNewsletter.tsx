"use client";

import React, { useState, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";

export function FooterNewsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setErrorMessage("Please enter a valid developer email address.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setErrorMessage(data?.error || "Subscription failed. Please verify your email.");
        return;
      }

      setSubscribed(true);
      setSuccessMessage(data.data?.message || "Subscribed! You will receive our next security release.");

      // GSAP spring pop on success badge
      if (containerRef.current) {
        const badge = containerRef.current.querySelector(".newsletter-success-badge");
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0.92, opacity: 0, y: 4 },
            { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }
          );
        }
      }
    } catch {
      setErrorMessage("Network error during subscription. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="footer-newsletter border-t border-[#E5E7EB] pt-7 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
    >
      {/* Left Copy */}
      <div className="max-w-md text-left">
        <h4 className="text-xs font-bold text-[#17172A] tracking-tight">
          Subscribe to developer changelog & security releases
        </h4>
        <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
          Get notified of new vulnerability rules, AI models, and deployment runbooks. No spam.
        </p>
      </div>

      {/* Right Form / State */}
      <div className="w-full md:w-auto">
        {subscribed ? (
          <div
            role="status"
            className="newsletter-success-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        ) : (
          <div className="flex flex-col items-start md:items-end w-full">
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 max-w-sm w-full relative"
              aria-busy={submitting}
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="developer@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  disabled={submitting}
                  required
                  aria-label="Developer email address"
                  className="h-9 text-xs rounded-[8px] bg-white border-[#E5E7EB] text-[#17172A] placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#5938F5] focus-visible:border-[#5938F5] w-full sm:w-64 transition-all"
                />

                {/* Micro Skeleton overlay during actual async loading */}
                {submitting && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-[8px] flex items-center px-3"
                  >
                    <div className="h-3 bg-slate-200/80 rounded animate-pulse w-3/4" />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="h-9 rounded-[8px] px-3.5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] active:scale-[0.98] text-white shadow-2xs gap-1.5 transition-all group shrink-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150 shrink-0" />
                  </>
                )}
              </Button>
            </form>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-2 font-medium"
              >
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

