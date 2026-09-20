import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getWorkBySlug } from "../../features/works/data/work-data";
import { useWorks } from "../../features/works/hooks/use-works";

const BASE_URL = "https://andikatp.my.id";

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AndikaTp — Fullstack Developer",
    description:
      "Portfolio of Andika Tri Prasetya, a Fullstack Developer building high quality web applications with modern design and rich user experiences.",
  },
  "/works": {
    title: "Works & Projects — AndikaTp",
    description:
      "Explore selected web development projects, fullstack applications, and case studies built by Andika Tri Prasetya.",
  },
  "/about": {
    title: "About Me — AndikaTp",
    description:
      "Learn more about Andika Tri Prasetya, Fullstack Developer background, technical skills, experiences, and qualifications.",
  },
  "/contact": {
    title: "Contact & Get in Touch — AndikaTp",
    description:
      "Connect with Andika Tri Prasetya for software engineering opportunities, collaborations, or inquiries.",
  },
};

export const SEO = () => {
  const location = useLocation();
  const { works } = useWorks();

  useEffect(() => {
    const path = location.pathname;
    let config = ROUTE_SEO[path];

    if (!config) {
      if (path.startsWith("/works/")) {
        const slug = path.replace(/^\/works\/?/, "");
        const work = slug ? getWorkBySlug(slug, works) : undefined;

        if (work) {
          config = {
            title: `${work.title} — AndikaTp`,
            description:
              work.description ||
              "Portfolio of Andika Tri Prasetya, a Fullstack Developer building high quality web applications.",
          };
        } else {
          config = {
            title: "Project Details — AndikaTp",
            description:
              "Portfolio of Andika Tri Prasetya, a Fullstack Developer building high quality web applications.",
          };
        }
      } else {
        config = {
          title: "AndikaTp — Fullstack Developer",
          description:
            "Portfolio of Andika Tri Prasetya, a Fullstack Developer building high quality web applications.",
        };
      }
    }

    // Update Document Title
    document.title = config.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", config.description);
    }

    // Update Open Graph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", config.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", config.description);
    }

    // Update Twitter Title & Description
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", config.title);
    }

    const twitterDesc = document.querySelector(
      'meta[name="twitter:description"]',
    );
    if (twitterDesc) {
      twitterDesc.setAttribute("content", config.description);
    }

    // Update Canonical URL & OG URL
    const currentUrl = `${BASE_URL}${path}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", currentUrl);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", currentUrl);
    }
  }, [location.pathname, works]);

  return null;
};
