/**
 * Central site configuration for portfolio domain migration & metadata.
 * Update DOMAIN or VITE_SITE_URL environment variable when switching to .dev domain.
 */
export const SITE_DOMAIN = import.meta.env.VITE_SITE_URL || "https://andikatp.dev";

export const SITE_CONFIG = {
  domain: SITE_DOMAIN,
  fullName: "Andika Tri Prasetya",
  handle: "Andikatp",
  title: "Andika Tri Prasetya — Flutter & Fullstack Developer",
  description:
    "Portfolio of Andika Tri Prasetya, a Flutter & Fullstack Developer building high quality mobile and web applications with modern design and rich user experiences.",
  ogImage: `${SITE_DOMAIN}/og-image.jpg`,
};
