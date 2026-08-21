import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pragadheesh-portfolio-v2.vercel.app";

  const routes = [
    "",
    "/about",
    "/skills",
    "/projects",
    "/coding-profile",
    "/timeline",
    "/certificates",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
