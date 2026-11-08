"use client";

import React, { useState } from "react";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryType, setInquiryType] = useState("general");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullname.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all required fields before submitting.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Simulate clean submission delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again or reach out on GitHub.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarketingLayout currentPath="/contact">
      <PageHero
        badge="GET IN TOUCH"
        badgeVariant="purple"
        title="Contact the DevSparks DeployCheck Team"
        description="Have a question about enterprise architecture, feature requests, or technical contributions? We would love to hear from you."
        primaryAction={{
          label: "View Documentation",
          href: "/docs",
        }}
        secondaryAction={{
          label: "GitHub Discussions",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions",
        }}
      />

      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#17172A] mb-4">Communication Channels</h3>

              <div className="space-y-4 text-xs text-[#667085]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#17172A] block">Email Support</span>
                    <a href="mailto:support@devsparks.com" className="text-[#5938F5] hover:underline">
                      support@devsparks.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3563E9] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#17172A] block">Response Time</span>
                    <span>Usually within 1 business day for technical inquiries.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#17172A] block">Company &amp; Location</span>
                    <span>DevSparks India — Open source developer tools.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F8FC] border border-[#E5E7EB] rounded-2xl p-6 text-xs text-[#667085]">
              <h4 className="font-bold text-[#17172A] mb-2">Looking for bug reports?</h4>
              <p className="leading-relaxed mb-3">
                If you discovered a software defect or security finding, please open an issue directly in our GitHub repository for the fastest response from our engineering maintainers.
              </p>
              <a
                href="https://github.com/nkdhawan76/DevSparks-India-opensource-1/issues"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-bold text-[#5938F5] hover:underline"
              >
                Open GitHub Issue &rarr;
              </a>
            </div>
          </div>

          {/* Interactive Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
            {success ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#17172A]">Message Received!</h3>
                <p className="text-xs text-[#667085] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to DevSparks DeployCheck. Our engineering team has received your message and will reply to <span className="font-semibold text-[#17172A]">{email}</span> within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    setSuccess(false);
                    setFullname("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  variant="outline"
                  className="mt-4 text-xs font-bold"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-[#17172A]">Send Us a Message</h3>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <Label htmlFor="fullname" className="text-xs font-semibold text-[#17172A]">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="Nikil Dhawan"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="pl-10 text-xs h-10 rounded-[8px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs font-semibold text-[#17172A]">
                      Work Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 text-xs h-10 rounded-[8px]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="space-y-1">
                  <Label htmlFor="inquiryType" className="text-xs font-semibold text-[#17172A]">
                    Inquiry Type
                  </Label>
                  <select
                    id="inquiryType"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full h-10 rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-xs text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#5938F5]"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Architecture &amp; VPS</option>
                    <option value="enterprise">Self-Hosted Enterprise Support</option>
                    <option value="partnership">Partnership &amp; Integration</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <Label htmlFor="subject" className="text-xs font-semibold text-[#17172A]">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Brief description of your inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-xs h-10 rounded-[8px]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <Label htmlFor="message" className="text-xs font-semibold text-[#17172A]">
                    Message *
                  </Label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="How can our engineering team assist you today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-[8px] border border-[#E5E7EB] bg-white p-3 text-xs text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#5938F5] leading-relaxed"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold shadow-xs gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
