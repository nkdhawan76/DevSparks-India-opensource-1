import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata-registry";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/app/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/app/", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/app/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/docs/", "/features/", "/product", "/tutorials", "/changelog", "/roadmap"],
        disallow: ["/app/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

