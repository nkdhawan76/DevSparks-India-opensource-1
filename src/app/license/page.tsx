import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Heart } from "lucide-react";

const meta = getRouteMetadata("/license");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.canonicalPath },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonicalPath,
  },
};

export default function LicensePage() {
  return (
    <MarketingLayout currentPath="/license">
      <PageHero
        badge="OPEN SOURCE LICENSING"
        badgeVariant="purple"
        title="MIT Open Source License"
        description="DevSparks DeployCheck is free and open-source software licensed under the permissive terms of the MIT License."
        primaryAction={{
          label: "View Repository on GitHub",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "Contribute to DeployCheck",
          href: "/contribute",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17172A]">The MIT License (MIT)</h3>
              <span className="text-xs text-[#667085]">Copyright &copy; 2026 DevSparks India</span>
            </div>
          </div>

          <div className="bg-[#17172A] text-slate-200 rounded-xl p-6 font-mono text-xs leading-relaxed space-y-4 overflow-x-auto">
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the &quot;Software&quot;), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </p>
            <p className="uppercase text-slate-400">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
