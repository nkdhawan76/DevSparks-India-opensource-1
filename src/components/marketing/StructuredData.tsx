import React from "react";
import { SITE_URL, BRAND_NAME, COMPANY_NAME, BRAND_SLOGAN } from "@/lib/metadata-registry";

interface StructuredDataProps {
  type?: "website" | "software";
}

export function StructuredData({ type = "website" }: StructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [
      "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
      "https://linkedin.com/company/devsparks-india",
      "https://x.com/devsparksindia",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${BRAND_NAME} by ${COMPANY_NAME}`,
    url: SITE_URL,
    description: BRAND_SLOGAN,
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND_NAME,
    operatingSystem: "Linux, macOS, Windows",
    applicationCategory: "DeveloperApplication",
    description: "Open-source developer operations platform for static pre-deployment audits, BYOK AI coding assistance, Linux VPS deployments, and synthetic uptime monitoring.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {type === "website" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      {type === "software" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      )}
    </>
  );
}
