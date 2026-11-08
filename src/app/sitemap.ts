import { MetadataRoute } from "next";
import { METADATA_REGISTRY, SITE_URL } from "@/lib/metadata-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(METADATA_REGISTRY);

  return routes.map((route) => {
    const meta = METADATA_REGISTRY[route];
    const isRoot = route === "/";

    return {
      url: `${SITE_URL}${meta.canonicalPath}`,
      lastModified: new Date(),
      changeFrequency: isRoot ? "daily" : "weekly",
      priority: isRoot ? 1.0 : meta.category === "product" ? 0.9 : meta.category === "solutions" ? 0.8 : 0.7,
    };
  });
}
