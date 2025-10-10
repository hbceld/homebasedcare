import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://eldorethomecare.co.ke/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://eldorethomecare.co.ke/blog",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // optional: if you plan to add a booking page in the future
      url: "https://eldorethomecare.co.ke/#appointment",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
